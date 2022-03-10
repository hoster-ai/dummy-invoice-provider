import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Package } from '../mongo/package.model';
@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package) private packageModel: ReturnModelType<typeof Package>,
  ) {}

  public async create(Package: Package): Promise<Package> {
    const newModel = new this.packageModel(Package);

    return newModel
      .save()
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  public async getPackages(): Promise<Package[]> {
    return this.packageModel.find().then((response: Package[]) => {
      return response;
    });
  }

  public async getPackageByName(name: string): Promise<Package> {
    return this.packageModel.findOne({ name }).then((response: Package) => {
      return response;
    });
  }

  public async purge() {
    return this.packageModel.deleteMany({});
  }
}
