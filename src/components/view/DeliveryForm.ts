import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { AppEvents, IDeliveryForm, Payment } from './../../types/index';
import { Form } from './Form';

export class DeliveryForm extends Form<IDeliveryForm> {
  private _buttons: HTMLButtonElement[];
  private _container: HTMLDivElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)

    this._buttons = Array.from(container.querySelectorAll('.button_alt')) as HTMLButtonElement[];
    this._container = ensureElement<HTMLDivElement>('.order__button', this.container);

    this.attachPaymentBtnListeners(events);
  }

  set payment(value: Payment) {
    this.setActivePayment(value);
  }

  set address(value: string) {
    const addressField = this.container.elements.namedItem('address') as HTMLInputElement;
    if (addressField) {
      addressField.value = value;
    }
  }

  private setActivePayment(payment: string): void {
    this._buttons.forEach(button => button.classList.remove('button_alt-active'));

    const activeButton = this._buttons.find(button => button.name === payment);
    if (activeButton) {
      activeButton.classList.add('button_alt-active');
    }
  }

  private attachPaymentBtnListeners(events: IEvents): void {
    this._buttons.forEach(button => {
      button.addEventListener('click', (e: MouseEvent) => this.handlePaymentClick(e as MouseEvent, events));
    });
  }

  private handlePaymentClick(e: MouseEvent, events: IEvents): void {
    const target = e.currentTarget as HTMLButtonElement;

    const payment = target.name as Payment;
    if (payment) {
      this.setActivePayment(payment);
      events.emit(AppEvents.PAYMENT_CHANGE, { payment });
    }
  }
}