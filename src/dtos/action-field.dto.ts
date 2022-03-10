import { ApiResponseProperty } from '@nestjs/swagger';
import { LabelTypeEnum } from '../enums/label.type.enum';

export class ActionFieldDto {
  id: string;

  @ApiResponseProperty({ type: String })
  label: string;

  @ApiResponseProperty()
  value: string | number | { [key: string]: string };

  @ApiResponseProperty({ enum: LabelTypeEnum })
  type: LabelTypeEnum;

  @ApiResponseProperty({ type: Boolean })
  required: boolean;

  @ApiResponseProperty({ type: Boolean })
  disabled = false;

  @ApiResponseProperty({ type: Boolean })
  hidden = false;

  @ApiResponseProperty({ type: String })
  regexValidation: string;

  @ApiResponseProperty({ type: Boolean })
  remoteValidation: boolean;

  @ApiResponseProperty({ type: String })
  error?: string;
}
