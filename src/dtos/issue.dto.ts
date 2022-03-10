import { IssueCategoryEnum } from '../enums/issues.category.enum';
import { IssuesPriorityEnum } from '../enums/issues.priority.enum';

export class IssueDto {
  title: string;
  description: string;
  category: IssueCategoryEnum;
  priority: IssuesPriorityEnum;
  resolved?: boolean = false;
  actionsDone: string[];
}
