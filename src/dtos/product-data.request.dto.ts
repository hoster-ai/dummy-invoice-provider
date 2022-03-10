import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { DurationEnum } from '../enums/duration.enum';

class SummaryDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: Number,
    title: 'Value',
    example: 10,
  })
  value: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: Number,
    title: 'Vat',
    example: 2,
  })
  vat: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: Number,
    title: 'Fee',
    example: 1,
  })
  fee: number;
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

export class OrderProductDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Bronze plesk',
  })
  name: string;

  @IsObject()
  @ApiProperty({
    type: SummaryDto,
  })
  price: SummaryDto;

  @IsNumber()
  @ApiProperty({
    type: Number,
    enum: DurationEnum,
    example: DurationEnum.ONE_YEAR,
  })
  duration: DurationEnum;

  @IsString()
  @IsDateString({ strict: true })
  @ApiProperty({
    type: Date,
    title: 'start date',
    example: '2019-09-26T07:58:30.996+0000',
  })
  startDate: Date;

  @IsString()
  @IsDateString({ strict: true })
  @ApiProperty({
    type: Date,
    title: 'end date',
    example: '2019-09-26T07:58:30.996+0000',
  })
  endDate: Date;
}

export class OrderDataDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    title: 'order ID',
  })
  orderId: number;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    isArray: true,
    type: OrderProductDto,
  })
  lines: OrderProductDto[];

  @IsDefined()
  @IsObject()
  @ApiProperty({
    type: SummaryDto,
  })
  summary: SummaryDto;
}
