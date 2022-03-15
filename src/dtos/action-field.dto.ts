import { ApiResponseProperty } from '@nestjs/swagger';
import { LabelTypeEnum } from '../enums/label.type.enum';

export class ActionFieldDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  label: string;

  @ApiResponseProperty()
  value: string | number | { [key: string]: string };

  @ApiResponseProperty()
  type: LabelTypeEnum;

  @ApiResponseProperty()
  required: boolean;

  @ApiResponseProperty()
  disabled = false;

  @ApiResponseProperty()
  hidden = false;

  @ApiResponseProperty()
  regexValidation: string;

  @ApiResponseProperty()
  remoteValidation: boolean;

  @ApiResponseProperty()
  error?: string;
}
