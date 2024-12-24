import { Category, IProduct } from '../../types/index';
import { Model } from '../base/Model';

export class Product extends Model<IProduct> {
  protected _id: string;
  protected _description: string;
  protected _image: string;
  protected _title: string;
  protected _category: Category;
  protected _price: number | null;

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id;
  }

  set description(value: string) {
    this._description = value;
  }

  get description(): string {
    return this._description;
  }

  set image(value: string) {
    this._image = value;
  }

  get image(): string {
    return this._image;
  }

  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  set category(value: Category) {
    this._category = value;
  }

  get category(): Category {
    return this._category;
  }

  set price(value: number | null) {
    this._price = value;
  }

  get price(): number | null {
    return this._price;
  }
}