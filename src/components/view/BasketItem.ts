import { IBasketItemView, IProductActions } from '../../types/index';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement, formatNumber, getWordForm } from '../../utils/utils';

export class BasketItem extends Component<IBasketItemView> {
  protected _title: HTMLElement;
  protected _index: HTMLElement;
  protected _price: HTMLElement;
  protected _removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, actions?: IProductActions) {
    super(container, events);

		this._title = ensureElement<HTMLElement>('.card__title', container);
    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._removeButton = container.querySelector('.basket__item-delete');

    this._removeButton.addEventListener('click', (event: MouseEvent) => {
      actions.onClick(event);
    });
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: number) {
    this.setText(this._price, `${formatNumber(value)} ${getWordForm(value)}`);
  }

  setItemPosition(value: number): void {
    this.setText(this._index, value.toString());
  }
}