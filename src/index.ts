import { Product } from './components/model/Product';
import { BasketItem } from './components/view/BasketItem';
import { ProductView } from './components/view/ProductView';
import { Success } from './components/view/Success';
import './scss/styles.scss';
import { AppEvents, CatalogUpdateEvent, IOrder, IProductView, Payment } from './types';
import { cloneTemplate } from './utils/utils';
import { events, api, presenter, appData,
  catalogTemplate, productPreviewTemplate,
  basketItemTemplate, successTemplate, modal,
  page, basket, deliveryForm, contactsForm} from './utils/constants';

events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

events.on(AppEvents.CATALOG_CHANGED, async () => {
  await presenter.loadProducts();
});

events.on<CatalogUpdateEvent>(AppEvents.CATALOG_CHANGED, ({ catalog }) => {
  page.catalog = catalog.map((item) => {
    const productData: IProductView = {
      category: item.category,
      title: item.title,
      image: api.cdn + item.image,
      price: item.price,
    };

    const product = new ProductView(cloneTemplate(catalogTemplate), events, {
      onClick: () => events.emit(AppEvents.PRODUCT_SELECT, item),
    });

    return product.render(productData);
  });
});

events.on(AppEvents.PRODUCT_SELECT, (item: Product) => {
  appData.setPreview(item);
});

events.on(AppEvents.VIEW_PRODUCT, async (item: Product) => {
  await presenter.loadProductById(item.id);
  const basketItemIds = appData.listBasketItemIds() || [];

  const product = new ProductView(cloneTemplate(productPreviewTemplate), events, {
    onClick: () => {
      appData.updateProductInBasketState(item);
      modal.close();
    },
  });

  const renderedCard = product.render({
    title: item.title,
    description: item.description,
    category: item.category,
    image: api.cdn + item.image,
    price: item.price,
    button: product.setButtonText(item.id, basketItemIds),
  });

  const button = renderedCard.querySelector('.card__button') as HTMLButtonElement;

  if (button) {
    product.setButtonState(button, item.price);
  }

  modal.render({
    content: renderedCard,
  });
});

events.on(AppEvents.BASKET_OPEN, () => {
  const basketItemIds = appData.listBasketItemIds();
  basket.setButtonState(basketItemIds);

  modal.render({
    content: basket.render(),
  });
});

events.on(AppEvents.BASKET_UPDATED, () => {
  page.counter = appData.countBasketItems();

  basket.items = appData.basketItems.map((item, index) => {
    const basketItem = new BasketItem(cloneTemplate(basketItemTemplate), events, {
      onClick: () => {
        appData.updateProductInBasketState(item);
      },
    });

    basketItem.setItemPosition(index + 1);

    return basketItem.render({
      title: item.title,
      price: item.price,
    });
  });

  const basketItemIds = appData.listBasketItemIds();

  basket.setButtonState(basketItemIds);
  basket.total = appData.calculateTotal();
});

events.on(AppEvents.VALIDATE_FIELDS, (errors: Partial<IOrder>) => {
  const { email, phone, address, payment } = errors;

  contactsForm.valid = !email && !phone;
  contactsForm.errors = Object.values({ phone, email }).filter(Boolean).join(', ');

  deliveryForm.valid = !address && !payment;
  deliveryForm.errors = Object.values({ address, payment }).filter(Boolean).join(', ');
});

events.on(/^order\..*:change$/, (data: { field: keyof IOrder, value: string }) => {
  appData.setOrderField(data.field, data.value);
});

events.on(/^contacts\..*:change$/, (data: { field: keyof IOrder, value: string }) => {
  appData.setContactsField(data.field, data.value);
});

events.on(AppEvents.PAYMENT_CHANGE, (data: { payment: string }) => {
  appData.order.payment = data.payment as Payment;
});

events.on(AppEvents.ORDER_OPEN, () => {
  modal.render({
    content: deliveryForm.render({
      payment: 'card',
      address: '',
      valid: false,
      errors: [],
    }),
  });
});

events.on(AppEvents.ORDER_SUBMIT, async () => {
  const isOrderValid = appData.validateOrder();

  if (isOrderValid) {
    modal.render({
      content: contactsForm.render({
        email: '',
        phone: '',
        valid: false,
        errors: [],
      }),
    });
  } else {
    console.warn('Заказ не валиден:', appData.formErrors);
  }
});

events.on(AppEvents.CONTACTS_SUBMIT, async () => {
  try {
    await presenter.submitOrder(appData.order);
    const success = new Success(cloneTemplate(successTemplate), events, {
      onClick: () => {
        modal.close();
        appData.clearBasket();
        page.counter = appData.countBasketItems();
      },
    });

    modal.render({
      content: success.render({
        total: appData.calculateTotal(),
      }),
    });
  } catch (error) {
    console.error('Ошибка при отправке заказа:', error);
  }
});

events.on(AppEvents.MODAL_OPEN, () => {
  page.locked = true;
});

events.on(AppEvents.MODAL_CLOSE, () => {
  page.locked = false;
});

presenter.loadProducts();