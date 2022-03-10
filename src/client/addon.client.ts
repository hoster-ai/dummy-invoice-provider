import { Axios } from 'axios';
import { AddonDto } from '../dtos/addon.dto';
import { ICLient } from './client.interface';

export class AddonClient implements ICLient<AddonDto> {
  constructor(private axios: Axios) {}

  public async create(addon: AddonDto) {
    return this.request('POST', 'addons', addon);
  }

  public async update(name: string, addon: AddonDto) {
    return this.request('PUT', 'addons/' + name, addon);
  }

  public async delete(name: string) {
    return this.request('DELETE', 'addons/' + name);
  }

  public async get(name: string) {
    return this.request('GET', 'addons/' + name);
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
