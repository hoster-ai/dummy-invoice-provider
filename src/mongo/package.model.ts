import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ options: { customName: 'packages' } })
export class Package {
  @prop({ type: String })
  parentId: string;

  @prop({ type: String, required: true })
  name: string;
}
