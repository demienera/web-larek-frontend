import { AppEvents, IOrder, IProduct } from '../types';
import { EventEmitter } from './base/events';
import { ProductApi } from './ProductApi';

export class Presenter {
  private events: EventEmitter;
  private api: ProductApi;
  private prevCatalog: IProduct[] = [];

  constructor(events: EventEmitter, api: ProductApi) {
    this.events = events;
    this.api = api;
  }

  async loadProducts(): Promise<void> {
    try {
      const catalog = await this.api.getProductItems();


      if (!this.isCatalogChanged(catalog)) {
        console.log('В каталоге изменений нет.');
        return;
      }

      this.prevCatalog = catalog;
      this.events.emit(AppEvents.CATALOG_CHANGED, { catalog });
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
      this.events.emit(AppEvents.CATALOG_ERROR);
    }
  }

  async loadProductById(id: string): Promise<void> {
    try {
      const product = await this.api.getProductItem(id);
      this.events.emit(AppEvents.PRODUCT_LOADED, product);
    } catch (error) {
      console.error(`Ошибка при загрузке продукта с ID ${id}:`, error);
      this.events.emit(AppEvents.PRODUCT_ERROR);
    }
  }

  async submitOrder(data: IOrder): Promise<void> {
    try {
      const orderResponse = await this.api.sendOrder(data);
      this.events.emit(AppEvents.ORDER_SUBMITED, orderResponse);
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      this.events.emit(AppEvents.ORDER_ERROR);
    }
  }

  private isCatalogChanged(newCatalog: IProduct[]): boolean {
    if (this.prevCatalog.length !== newCatalog.length) {
      return true;
    }

    return this.prevCatalog.some((product, index) => product.id !== newCatalog[index].id);
  }
}