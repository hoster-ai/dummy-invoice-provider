import { TemplateActionEnum } from 'src/enums/template-action.enum';
import { LanguageEnum } from '../enums/language.enum';

export class TemplateDto {
  productId?: string;
  serviceProviderId?: string;
  language: LanguageEnum;
  payload: unknown;
  action?: TemplateActionEnum;
}
