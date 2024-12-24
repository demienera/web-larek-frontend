import { AppEvents, IBasketView } from '../../types';
import { createElement, ensureElement, formatNumber, getWordForm } from '../../utils/utils';
import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';

export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if(this._button) {
      this._button.addEventListener('click', this.triggerOrderOpen.bind(this))
    }

    this.items = [];
  }

  private triggerOrderOpen(): void {
    this.events.emit(AppEvents.ORDER_OPEN);
  }

  set items(items: HTMLElement[]) {
    if(items.length) {
      this._list.replaceChildren(...items);
    } else {
      this._list.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста'
        })
      )
    }
  }

  set total(total: number) {
    try {
      this.setText(this._total, `${formatNumber(total)} ${getWordForm(total)}`);
    } catch {
      this.setText(this._total, 'Нет данных');
    }
  }

  setButtonState(items: string[]): void {
    if(items.length) {
      this.setDisable(this._button, false);
    } else {
      this.setDisable(this._button, true)
    }
  }
}