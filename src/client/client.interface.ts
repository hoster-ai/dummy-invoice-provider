export interface ICLient<T> {
  create(data: T): Promise<unknown>;
  update(id: string, data: T): Promise<unknown>;
  delete(id: string): Promise<unknown>;
  get(data?: string): Promise<unknown>;
}
