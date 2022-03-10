import { Axios } from 'axios';
import { IssueDto } from '../dtos/issue.dto';
import { ICLient } from './client.interface';

export class IssueClient implements ICLient<IssueDto> {
  constructor(private axios: Axios) {}

  public async create(data: IssueDto) {
    return this.request('POST', 'issues', data);
  }

  public async update(title: string, data: IssueDto) {
    return this.request('PUT', 'issues/' + title, data);
  }

  public async delete(title: string) {
    return this.request('DELETE', 'issues/' + title);
  }

  public async get(title?: string) {
    return this.request('GET', 'issues', title);
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
