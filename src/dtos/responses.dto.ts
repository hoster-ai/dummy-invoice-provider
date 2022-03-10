import { ApiResponseProperty } from '@nestjs/swagger';
import { ActionFieldDto } from './action-field.dto';
import { MetaDto } from './meta.response.dto';
import { ProviderInfoDto } from './provider-info.response.dto';

export class BaseResponse {
  @ApiResponseProperty({
    type: Number,
    example: 200,
  })
  code: number;

  @ApiResponseProperty({
    type: String,
    example: 'Ok',
  })
  message: string;

  @ApiResponseProperty()
  data?: any;
}

export class InfoResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: ProviderInfoDto,
  })
  info: ProviderInfoDto;
}

export class MetaResponseDto extends BaseResponse {
  @ApiResponseProperty({
    example: MetaDto,
  })
  meta?: MetaDto;
}

export class ErrorResponseDto extends BaseResponse {
  @ApiResponseProperty({
    example: 'Not implemented',
  })
  errors?: string[] | string;
}

export class ActionFieldsValidationResponse extends BaseResponse {
  @ApiResponseProperty({
    type: [ActionFieldDto],
  })
  actionFields?: ActionFieldDto[];
}

export class BooleanResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: Boolean,
    example: true,
  })
  result: boolean;
}
