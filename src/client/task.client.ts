import { Axios } from 'axios';
import { TaskDto } from 'src/dtos/task.dto';
import { ICLient } from './client.interface';

export class TaskClient implements ICLient<any> {
  constructor(private axios: Axios) {}

  public async create(data: TaskDto) {
    return this.request('POST', 'tasks', data);
  }

  public async update(
    id: string,
    status: 'in-progress' | 'cancel' | 'complete',
  ) {
    return this.request('POST', 'tasks/' + id + '/' + status);
  }

  public async delete(id: string) {
    return this.request('DELETE', 'tasks/' + id);
  }

  public async get(id?: string) {
    return this.request('GET', 'tasks/' + id);
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
