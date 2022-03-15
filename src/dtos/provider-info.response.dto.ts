import { ApiResponseProperty } from '@nestjs/swagger';
import { ActionFieldDto } from './action-field.dto';

export class DynamicPriceInfoDto {
  @ApiResponseProperty({ type: String, example: 'cpu' })
  key: string;

  @ApiResponseProperty({ type: Number, example: 5 })
  fetchChargesInterval: number; //in minutes

  @ApiResponseProperty({ type: String, example: 'per core' })
  description: string;
}

class ListActionDto {
  @ApiResponseProperty({ type: String })
  icon: string;

  @ApiResponseProperty({ type: String })
  label?: string;

  @ApiResponseProperty({ type: String })
  popup?: string;

  @ApiResponseProperty({ type: String })
  link: string;
}

class TabDto {
  @ApiResponseProperty({ type: String })
  label: string;

  @ApiResponseProperty({ type: String })
  url: string;
}

class MenuItemDto extends TabDto {
  @ApiResponseProperty({ type: String })
  icon: string;
}

export class ProviderInfoDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  logo?: string;

  @ApiResponseProperty({ type: String })
  title?: string;

  @ApiResponseProperty({ type: String })
  description?: string;

  @ApiResponseProperty({ type: [ActionFieldDto] })
  actionFields?: ActionFieldDto[];

  @ApiResponseProperty({ type: [TabDto] })
  productTabs?: TabDto[];

  @ApiResponseProperty({ type: [ListActionDto] })
  listActions?: ListActionDto[];

  @ApiResponseProperty({ type: [TabDto] })
  settings?: TabDto[];

  @ApiResponseProperty({ type: [MenuItemDto] })
  menuItems?: MenuItemDto[];

  @ApiResponseProperty()
  requiredFields?: string[];

  @ApiResponseProperty()
  returnMetaKeys?: string[];
}
