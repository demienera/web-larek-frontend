import { AppEvents, IModalView } from './../../types/index';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalView> {
  protected _content: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._content = ensureElement<HTMLElement>('.modal__content', this.container);
    this._button = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this._button.addEventListener('click', () => {
      this.close();
    });

    this.container.addEventListener('click', (event: MouseEvent) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  setContent(value: HTMLElement): void {
    if (this._content) {
      this._content.replaceChildren(value);
    }
  }

  open(): void {
    this.toggleClass(this.container, 'modal_active', true);
		this.events.emit(AppEvents.MODAL_OPEN);
  }

  close(): void {
    this.toggleClass(this.container, 'modal_active', false);
    if (this._content) {
      this._content.innerHTML = '';
    }
		this.events.emit(AppEvents.MODAL_CLOSE);
  }

  render(data: IModalView): HTMLElement {
    super.render(data);

    if (data.content) {
      this.setContent(data.content);
    }
    this.open();
    return this.container;
  }
}