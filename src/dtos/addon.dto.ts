import { LabelTypeEnum } from '../enums/label.type.enum';
import { MultilangTextDto } from './multilang.dto';

export class AddonDto {
  name: string;

  title: MultilangTextDto[];

  description: MultilangTextDto[];

  icon_url: string;

  type: LabelTypeEnum;

  required: boolean;

  active: boolean;

  deletable?: boolean;

  editable?: boolean;
}
