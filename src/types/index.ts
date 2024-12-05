export type Payment = 'Онлайн' | 'При получении';

export enum Category {
  SOFT = 'софт',
  HARD = 'хард-скил',
  OTHER = 'другое',
  ADDITIONAL = 'дополнительное',
  BUTTON = 'кнопка'
}

export enum AppEvents {
  ORDER_STEP_CHANGED = 'order.step:changed', // переход между шагами оформления заказа
  ORDER_SUBMIT = 'order:submit', // завершение оформления заказа
  CONTACT_INFO = 'contact.info:changed', // обновление контактных данных (почта и телефон)
  ORDER_DETAILS = 'order.details:changed', // обновление способа оплаты или адреса доставки
  BASKET_UPDATED = 'basket:changed', // добавление или удаление товара из корзины
  MODAL_TOGGLE = 'modal:toggle', // открытие или закрытие модального окна
  VIEW_PRODUCT = 'product:open', // просмотр карточки товара
  CATALOG_CHANGED = 'catalog:changed', // обновление каталога товаров
  VALIDATE_EMAIL = 'form.email:validate', // валидация email
  VALIDATE_PHONE = 'form.phone:validate', // валидация телефона
  VALIDATE_ADDRESS = 'form.address:validate', // валидация адреса
  VALIDATE_PAYMENT = 'form.payment:validate', // валидация способа оплаты
  VALIDATE_ALL_FIELDS = 'form:validate', // валидация всей формы
  INPUT_EMAIL = 'input.email:changed', // изменение email
  INPUT_PHONE = 'input.phone:changed', // изменение телефона
  INPUT_ADDRESS = 'input.address:changed', // изменение адреса
  INPUT_PAYMENT = 'input.payment:changed', // изменение способа оплаты
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: Category;
  price: number | null;
}

interface IProductActions {
  onClick: (event: MouseEvent) => void;
}

export interface IContactsForm {
  email: string;
  phone: string;
}

export interface IDeliveryForm {
  payment: Payment;
  address: string;
}

type OrderForm = IContactsForm & IDeliveryForm;

export interface IOrder extends OrderForm {
  items: IProduct[];
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

export interface IFormState {
  valid: boolean
  errors: string[]
}

type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IPageView {
  catalog: HTMLElement[];
  counter: number
  locked: boolean
}

export interface IProductView {
  id: HTMLElement;
  description: HTMLElement;
  image: HTMLImageElement;
  title: HTMLElement;
  category: HTMLElement;
  price: HTMLElement;
}

export interface IBasketView {
  items: HTMLElement[];
  total: HTMLElement;
}

export interface IBasketItemView {
  title: HTMLElement;
  price: HTMLElement;
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



