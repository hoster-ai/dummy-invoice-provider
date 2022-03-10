import axios from 'axios';
import { AddonClient } from './addon.client';
import { IssueClient } from './issue.client';
import { ProductClient } from './product.client';
import { TaskClient } from './task.client';
import { TemplateClient } from './template.client';

export class Client {
  addons: AddonClient = new AddonClient(axios);
  tasks: TaskClient = new TaskClient(axios);
  templates: TemplateClient = new TemplateClient(axios);
  products: ProductClient = new ProductClient(axios);
  issues: IssueClient = new IssueClient(axios);
}
