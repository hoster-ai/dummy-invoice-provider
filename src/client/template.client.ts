import { Axios } from 'axios';
import { TemplateDto } from '../dtos/template.dto';
import { ICLient } from './client.interface';

export class TemplateClient implements ICLient<TemplateDto> {
  constructor(private axios: Axios) {}

  public async create(data: TemplateDto) {
    return this.request('POST', 'templates', { data });
  }

  public async update(name: string, data: TemplateDto) {
    return this.request('PUT', 'templates/' + name, data);
  }

  public async delete(id: string) {
    return this.request('DELETE', 'templates/' + id);
  }

  public async get(data?: string) {
    return this.request('GET', 'templates', data);
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
