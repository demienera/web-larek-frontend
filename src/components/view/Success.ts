import { ISuccess, ISuccessActions } from './../../types/index';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement, formatNumber, getWordForm } from '../../utils/utils';

export class Success extends Component<ISuccess> {
  protected _total: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, actions: ISuccessActions) {
    super(container, events);

    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.attachBtnHandler(actions);
  }

  set total(value: number) {
    this.updateTotal(value);
  }

  private updateTotal(value: number): void {
    this.setText(this._total, `Списано ${formatNumber(value)} ${getWordForm(value)}`);
  }

  private attachBtnHandler(actions: ISuccessActions): void {
    if (actions?.onClick) {
      this._closeButton.addEventListener('click', actions.onClick);
    }
  }
}