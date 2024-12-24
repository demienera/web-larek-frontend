import { Category, IProductActions, IProductView } from './../../types/index';
import { Component } from '../base/Component';
import { ensureElement, formatNumber, getWordForm } from '../../utils/utils';
import { IEvents } from '../base/events';

export class ProductView extends Component<IProductView> {
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _price?: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, actions?: IProductActions) {
    super(container, events);

    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._category = ensureElement<HTMLElement>('.card__category', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._description = container.querySelector<HTMLElement>(`.card__text`) || null;
    this._button = container.querySelector<HTMLButtonElement>('.card__button') || null;

    this.handleButtonClick(actions);
  }

  private handleButtonClick(actions: IProductActions): void {
    if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				this.container.addEventListener('click', actions.onClick);
			}
		}
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent)
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set category(value: Category) {
    if (this._category) {
      this.setText(this._category, value);

      const category = Object.keys(Category).find(key => Category[key as keyof typeof Category] === value);

      if (category) {
        this._category.classList.add(
          'card__category',
          `card__category_${category.toLowerCase()}`
        );
      }
    }
  }

  set price(value: number) {
    if (value === null) {
      this.setText(this._price, 'Бессценно');
    } else {
      this.setText(this._price, `${formatNumber(value)} ${getWordForm(value)}`);
    }
  }

  set button(value: string) {
    if (this._button) {
      if (value === 'disable') {
        this._button.disabled = true;
        this.setText(this._button, 'Бесценный товар');
      } else {
        this._button.disabled = false;
        this.setText(this._button, value);
      }
    }
  }

  setButtonText(id: string, value: string[]): string {
    return value.includes(id) ? 'Убрать из корзины' : 'В корзину'
  }

  setButtonState(button: HTMLButtonElement, price: number | null): void {
    if (price === null) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }
}