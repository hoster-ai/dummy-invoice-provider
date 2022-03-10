import { Axios } from 'axios';
import { ProductDto } from '../dtos/product.dto';
import { ICLient } from './client.interface';

export class ProductClient implements ICLient<ProductDto> {
  constructor(private axios: Axios) {}

  public async create(data: ProductDto): Promise<unknown> {
    return this.request('POST', 'products', data);
  }

  public async update(name: string, data: ProductDto): Promise<unknown> {
    return this.request('PUT', 'products/' + name, data);
  }

  public async delete(data: string): Promise<unknown> {
    return this.request('DELETE', 'products/' + data);
  }

  public async get(data: string): Promise<unknown> {
    return this.request('GET', 'products', data);
  }

  private async request(
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: unknown,
  ) {
    return this.axios
      .request({
        method,
        url: process.env.SERVICE_PROVIDER_API_URL + endpoint,
        data,
        headers: {
          Authorization: 'Bearer ' + process.env.SERVICE_PROVIDER_TOKEN,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
  }
}
