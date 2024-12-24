import { IOrder, IProduct, Payment } from './../../types/index';
import { Model } from '../base/Model';

export class Order extends Model<IOrder> {
  _items: IProduct[] = [];
  _total = 0;
  _email = '';
  _phone = '';
  _payment: Payment = 'card';
  _address = '';

  set items(value: IProduct[]) {
    this._items = value;
  }

  set total(value: number) {
    this._total = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set payment(value: Payment) {
    this._payment = value;
  }

  set address(value: string) {
    this._address = value;
  }
}