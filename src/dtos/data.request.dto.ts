import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsObject } from 'class-validator';
import { OrderDataDto } from './product-data.request.dto';
import { UserDataDto } from './user-data.request.dto';

export class RequestDto {
  @IsDefined()
  @IsObject()
  @ApiProperty({ type: UserDataDto })
  userData: UserDataDto;

  @IsDefined()
  @IsObject({ each: true })
  @ApiProperty({ type: OrderDataDto, isArray: true })
  orderData: OrderDataDto[];
}
