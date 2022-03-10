import { PackageService } from './package.service';

export class cPanelService {
  constructor(private packageService: PackageService) {}

  public async getLightestServer(packageName: string): Promise<string> {
    // const servers = await this.packageService.getPackages(packageName);

    const lightest_server = '';
    // for (const server of servers) {
    //   if (server.includes('2')) {
    //     lightest_server = server;
    //   }
    // }

    return lightest_server;
  }
}
