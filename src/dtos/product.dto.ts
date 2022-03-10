import { TemplateActionEnum } from 'src/enums/template-action.enum';
import { MultilangTextDto } from './multilang.dto';
class ProductTemplate {
  action: TemplateActionEnum;
  templateId: string;
}
export class ProductDto {
  name: string;
  providerId: string;
  categoryId?: string;
  title: MultilangTextDto[];
  userId: string;
  defaultPrices: {
    policy: {
      title: string;
      description?: string;
      default: boolean;
    };
  }[];

  activeVersion?: boolean;
  version?: number;
  asNewVersion?: boolean;
  enabled?: boolean = true;
  autoRenew?: boolean = false;
  upgradeProductIds?: string[];
  downgradeProductIds?: string[];
  description?: MultilangTextDto[];
  isDomain?: boolean = false;
  requireDomain?: boolean = false;
  expirationDateOffset?: number;
  trialDays?: number = 0;
  suspendedAfterDays?: number = 0;
  softDeleteDays?: number = 0;
  hardDeleteDays?: number = 0;
  restorePrice?: number = 0;
  addonIds?: string[];
  options?: Record<string, unknown>[];
  tags?: string[];
  postponeDays?: number;
  postponeTimesPerYear?: number;
  templates?: ProductTemplate[];
}
