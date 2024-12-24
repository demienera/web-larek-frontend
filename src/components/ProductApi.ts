import { IOrder, IOrderApi, IProduct } from '../types';
import { Api, ApiListResponse } from './base/api';

export class ProductApi extends Api {
  cdn: string;
  id: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
    this.id = '';
	}

  getProductItem(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`)
    .then((item: IProduct) => {
      if (!item || !item.id || !item.image) {
        throw new Error('Некорректные данные товара');
      }

      return {
        ...item,
        image: this.cdn + item.image,
      };
    })
    .catch((error) => {
      console.error('Ошибка при получении товара:', error);
      throw new Error('Не удалось получить товар');
    });
  }

  getProductItems() {
    return this.get('/product')
    .then((data: ApiListResponse<IProduct>) => {
      return data.items.map((item) => ({ ...item }))
    })
  }

  sendOrder(data: IOrder): Promise<IOrderApi> {
    return this.post('/order', data).then((order: IOrderApi) => order);
  }
}