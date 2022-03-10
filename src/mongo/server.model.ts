import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ options: { customName: 'servers' } })
export class Server {
  @prop()
  parentId: string;

  @prop()
  host: string;

  @prop()
  password: string;

  @prop()
  server: string;
}
