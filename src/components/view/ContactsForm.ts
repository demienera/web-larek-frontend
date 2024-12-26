import { phoneMask } from '../../utils/constants';
import { IEvents } from '../base/events';
import { IContactsForm } from './../../types/index';
import { Form } from './Form';

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
      phoneMask.mask(phoneInput);
    }
  }

  set email(value: string) {
    const emailInput = this.getInputItem('email');
    if (emailInput) {
      emailInput.value = value;
    }
  }
}
