import { ApiResponseProperty } from '@nestjs/swagger';
import { ActionFieldDto } from './action-field.dto';
import { MetaDto } from './meta.response.dto';
import { OrderDataDto } from './product-data.request.dto';
import { ProviderInfoDto } from './provider-info.response.dto';
import { UserDataDto } from './user-data.request.dto';

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

export class InvoiceSuccessResponseDto extends BaseResponse {
  orderData: OrderDataDto[];
  userData: UserDataDto;
  invoice_pdf?: string;
}

export class InvoiceTaskResponseDto extends BaseResponse {
  taskId: string;
}
