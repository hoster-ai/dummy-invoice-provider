import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsObject } from 'class-validator';
import { ProductDataDto as ProductDataDto } from './product-data.request.dto';
import { UserDataDto as UserDataDto } from './user-data.request.dto';

export class RequestDto {
  @IsDefined()
  @IsObject()
  @ApiProperty({ type: UserDataDto })
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  @ApiProperty({ type: ProductDataDto })
  productData: ProductDataDto;
}
