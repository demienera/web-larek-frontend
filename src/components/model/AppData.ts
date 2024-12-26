import { AppEvents, FormErrors, IAppData, IOrder, IProduct } from './../../types/index';
import { Model } from '../base/Model';
import { Product } from './Product';

export class AppData extends Model<IAppData> {
  catalog: IProduct[] = [];
  basketItems: IProduct[] = [];
  order: IOrder = {
    address: '',
    payment: 'card',
    email: '',
    total: 0,
    phone: '',
    items: []
  };
  preview: IProduct | null;
  formErrors: FormErrors = {};

  calculateTotal(): number {
    return this.basketItems.reduce((total, item) => {
      if (item.price !== null) {
        total += item.price;
      }
      return total;
    }, 0);
  }

  clearBasket(): void {
    this.basketItems = [];
    this.updateBasket();
    this.resetOrder()
  }

  setCatalog(items: IProduct[]): void {
    this.catalog = items.map(item => new Product(item, this.events));
    this.emitChanges(AppEvents.CATALOG_CHANGED, { catalog: this.catalog });
  }

  setPreview(item: IProduct): void {
    this.preview = item;
    this.emitChanges(AppEvents.VIEW_PRODUCT, item);
  }

  listBasketItemIds(): string[] {
    return this.basketItems.map(item => item.id);
  }

  countBasketItems(): number {
    return this.basketItems.length;
  }

  addToBasket(product: IProduct): void {
    this.basketItems.push(product);
    this.updateBasket();
    this.updateOrder();
  }

  removeFromBasket(id: string): void {
    this.basketItems = this.basketItems.filter(item => item.id !== id);
    this.updateBasket();
    this.updateOrder();
  }

  updateProductInBasketState(item: IProduct): void {
    const basketItemIds = this.listBasketItemIds() || [];

    if (basketItemIds.includes(item.id)) {
      this.removeFromBasket(item.id);
    } else {
      this.addToBasket(item);
    }
  }

  private updateBasket(): void {
    this.emitChanges(AppEvents.BASKET_UPDATED, { basketItems: this.basketItems });
  }

  private updateOrder(): void {
    this.order.items = this.basketItems.map(item => item.id);
    this.order.total = this.calculateTotal();
    this.emitChanges(AppEvents.ORDER_UPDATED, { order: this.order })
  }

  private resetOrder(): void {
    this.order = {
      email: '',
      phone: '',
      payment: 'card',
      address: '',
      items: [],
      total: 0,
    };
    this.emitChanges(AppEvents.ORDER_UPDATED, { order: this.order })
  }

  resetContacts(): void {
    this.order = {
      email: '',
      phone: '',
      payment: 'card',
      address: '',
      items: this.order.items,
      total: this.order.total,
    };
    this.emitChanges(AppEvents.ORDER_UPDATED, { order: this.order })
  }

  resetFormErrors(): void {
    this.formErrors = {};
    this.events.emit(AppEvents.VALIDATE_FIELDS, this.formErrors);
  }

  setOrderField(field: keyof IOrder, value: string) {
    if (field === 'payment' && (value === 'card' || value === 'cash')) {
      this.order[field] = value;
    } else if (field === 'address') {
      this.order[field] = value;
    } else {
      console.error(`Недопустимое значение для поля ${field}: ${value}`);
      return;
    }

    if (this.validateOrder()) {
      this.events.emit(AppEvents.ORDER_READY, this.order);
    }
  }

  setContactsField(field: keyof IOrder, value: string) {
    if (field === 'email') {
      this.order[field] = value;
    } else if (field === 'phone') {
      this.order[field] = value;
    } else {
      console.error(`Недопустимое значение для поля ${field}: ${value}`);
      return;
    }

    if (this.validateContacts()) {
        this.events.emit(AppEvents.ORDER_READY, this.order);
    }
  }

  validateOrder() {
    const errors: Partial<FormErrors> = {};
    const addressRegex = /^[a-zA-Zа-яА-Я0-9\s,.-]{5,100}$/;

    this.validateFieldWithRegex('address', this.order.address, addressRegex, 'введите корректный адрес доставки (не менее 5 символов)');
    this.validateField('payment', this.order.payment, 'выберите способ оплаты');

    Object.assign(errors, this.formErrors);

    this.formErrors = errors;
    this.events.emit(AppEvents.VALIDATE_FIELDS, this.formErrors);
    return Object.keys(errors).length === 0;
  }

  validateContacts() {
    const errors: Partial<FormErrors> = {};
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    this.validateFieldWithRegex('email', this.order.email, emailRegex, 'введите корректный адрес почты', 'введите адрес почты');
    this.validateFieldWithRegex('phone', this.order.phone, phoneRegex, 'введите корректный номер телефона', 'введите номер телефона');

    Object.assign(errors, this.formErrors);

    this.formErrors = errors;
    this.events.emit(AppEvents.VALIDATE_FIELDS, this.formErrors);
    return Object.keys(errors).length === 0;
  }

  private validateFieldWithRegex(field: keyof FormErrors, value: string | undefined, regex: RegExp, errorMessage: string, emptyMessage?: string): void {
    const error = !value
        ? emptyMessage || errorMessage
        : !regex.test(value)
        ? errorMessage
        : '';
    this.validateFieldError(field, error);
  }

  private validateField(field: keyof FormErrors, value: string | undefined, errorMessage: string): void {
    const error = value ? '' : errorMessage;
    this.validateFieldError(field, error);
  }

  private validateFieldError(field: keyof FormErrors, errorMessage: string): void {
    if (errorMessage) {
        this.formErrors[field] = errorMessage;
    } else {
        delete this.formErrors[field];
    }
  }
}