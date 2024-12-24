export type Payment = 'card' | 'cash';

export enum Category {
  SOFT = 'софт',
  HARD = 'хард-скил',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное',
  BUTTON = 'кнопка'
}

export enum AppEvents {
  ORDER_OPEN = 'order:open', // открытие первой формы оформления заказа
  ORDER_UPDATED = 'order:update', // заказ обновился
  ORDER_SUBMIT = 'order:submit', // переход ко второй форме заказа
  CONTACTS_SUBMIT = 'contacts:submit', // завершение оформления заказа
  ORDER_READY = 'order:ready', // заказ прошел валидацию и готов к отправке на сервер
  ORDER_RESET = 'order:reset', // очистка заказа
  ORDER_SUBMITED = 'order:submitted', // заказ отправлен на сервер
  ORDER_ERROR = 'order:error', // ошибки при отправке заказа
  BASKET_OPEN = 'basket:open', // открытие корзины
  BASKET_UPDATED = 'basket:change', // обновление корзины
  MODAL_OPEN = 'modal:open', // открытие модального окна
  MODAL_CLOSE = 'modal:close', // закрытие модального окна
  PRODUCT_SELECT = 'card:select', // выбор конкретного продукта
  VIEW_PRODUCT = 'product:open', // просмотр карточки товара
  PRODUCT_LOADED = 'product:loaded', // загрузка товара с сервера
  PRODUCT_ERROR = 'product:error', // ошибка загрузки товара с сервера
  CATALOG_ERROR = 'products:error', // ошибка загрузки каталога с сервера
  CATALOG_CHANGED = 'catalog:change', // изменения в каталоге товаров
  VALIDATE_FIELDS = 'formErrors:change', // валидация формы
  INPUT_EMAIL = 'contacts.email:change', // изменение email
  INPUT_PHONE = 'contacts.phone:change', // изменение телефона
  INPUT_ADDRESS = 'order.address:change', // изменение адреса
  PAYMENT_CHANGE = 'payment:change', // изменение способа оплаты
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}

export interface IProductActions {
  onClick: (event: MouseEvent) => void;
}

export interface IContactsForm {
  email: string;
  phone: string;
}

export interface IDeliveryForm {
  address: string;
  payment: Payment;
}

export type OrderForm = IContactsForm & IDeliveryForm;

export interface IOrder extends OrderForm {
  items: string[];
  total: number;
}

export interface IOrderApi {
  id: string;
}

export interface IAppData {
  catalog: IProduct[];
  basketItems: IProduct[];
  order: IOrder;
  preview: string | null;
}

export type CatalogUpdateEvent = {
  catalog: IProduct[];
};

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IPageView {
  catalog: HTMLElement[];
  counter: number
  locked: boolean
}

export interface IProductView {
  description?: string;
  image: string;
  title: string;
  category: Category;
  price: number;
  button?: string;
}

export interface IBasketView {
  items: string[];
  total: string;
}

export interface IBasketItemView {
  title: string;
  price: number;
  button?: string;
}

export interface ISuccess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

export interface IModalView {
  content: HTMLElement;
}