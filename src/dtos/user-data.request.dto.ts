import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CountryEnum } from '../enums/country.enum';

export class UserDataDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '5ce45d7606444f199acfba1e',
  })
  id?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: '5ce45d7606444f199acfba1e',
  })
  parentId?: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty({
    type: String,
    title: 'Email',
    example: 'email@example.com',
  })
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    title: 'First Name',
    example: 'Fname',
  })
  firstName: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    title: 'Last Name',
    example: 'Lname',
  })
  lastName: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    title: 'Is company',
    example: false,
    default: false,
  })
  isCompany?: boolean;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: 'Company Name',
  })
  companyName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  @ApiProperty({
    type: String,
    title: 'Telephone',
    example: '+30.2100000000',
  })
  telephone: string;

  @IsOptional()
  @IsPhoneNumber(null)
  @ApiPropertyOptional({
    type: String,
    title: 'Mobile',
    example: '+30.6900000000',
  })
  mobile?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: 'Address 1',
  })
  address1: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: 'Address 2',
  })
  address2?: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: 'Address 3',
  })
  address3?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @ApiProperty({
    type: String,
    title: 'Postal Code',
    example: '545454',
  })
  postcode: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: 'City',
  })
  city: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CountryEnum)
  @ApiProperty({
    enum: CountryEnum,
    title: 'Country Code',
    example: 'GB',
  })
  country: CountryEnum;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: 'State',
  })
  state?: string;

  @IsOptional()
  @MaxLength(3)
  @ApiPropertyOptional({
    type: String,
  })
  currency?: string;
}
