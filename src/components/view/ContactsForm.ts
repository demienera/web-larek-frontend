import { IEvents } from '../base/events';
import { IContactsForm } from './../../types/index';
import { Form } from './Form';
import Inputmask from 'inputmask';

export class ContactsForm extends Form<IContactsForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  private getInputItem(name: string): HTMLInputElement {
    return this.container.elements.namedItem(name) as HTMLInputElement;
  }

  set phone(value: string) {
    const phoneInput = this.getInputItem('phone');
    if (phoneInput) {
      phoneInput.value = value;
      this.initMask(phoneInput);
    }
  }

  set email(value: string) {
    const emailInput = this.getInputItem('email');
    if (emailInput) {
      emailInput.value = value;
    }
  }

  private initMask(phoneInput: HTMLInputElement) {
    const mask = new Inputmask('+7 (999) 999 99 99');
    mask.mask(phoneInput);
  }

  mask() {
    const phoneInput = this.getInputItem('phone');
    if (phoneInput) {
      this.initMask(phoneInput);
    }
  }
}
