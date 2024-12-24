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
    this.getInputItem('phone').value = value;
  }

  set email(value: string) {
    this.getInputItem('email').value = value;
  }
}