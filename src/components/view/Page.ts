import { AppEvents, IPageView } from './../../types/index';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement, formatNumber } from '../../utils/utils';

export class Page extends Component<IPageView> {
  protected _catalog: HTMLElement;
  protected _counter: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._catalog = ensureElement<HTMLElement>('.gallery', container);
    this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
    this._basket = ensureElement<HTMLElement>('.header__basket', container);

    this.addBasketClickListener();
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set counter(value: number) {
    this.setText(this._counter, formatNumber(value));
  }

  set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}

  private addBasketClickListener(): void {
    this._basket.addEventListener('click', () => {
      this.events.emit(AppEvents.BASKET_OPEN);
    });
  }
}