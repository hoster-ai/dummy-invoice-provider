import { ApiResponseProperty } from '@nestjs/swagger';
import { ActionFieldDto } from './action-field.dto';

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

  @ApiResponseProperty({ type: [ActionFieldDto] })
  actionFields: ActionFieldDto[];

  @ApiResponseProperty({ type: [TabDto] })
  productTabs: TabDto[];

  @ApiResponseProperty({ type: [ListActionDto] })
  listActions: ListActionDto[];

  @ApiResponseProperty({ type: [ActionFieldDto] })
  settings: TabDto[];

  @ApiResponseProperty({ type: [MenuItemDto] })
  menuItems: MenuItemDto[];

  @ApiResponseProperty()
  returnMetaKeys: string[];
}
