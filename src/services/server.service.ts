import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Server } from '../mongo/server.model';
@Injectable()
export class ServerService {
  constructor(
    @InjectModel(Server) private serverModel: ReturnModelType<typeof Server>,
  ) {}

  public async create(server: Server): Promise<Server> {
    const newModel = new this.serverModel(server);

    return newModel
      .save()
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  public async getServer(server: string): Promise<Server> {
    return this.serverModel
      .findOne({ server })
      .then((response: Server) => response);
  }

  public async getServersByParentId(parentId: string): Promise<Server[]> {
    return this.serverModel
      .find({ parentId })
      .then((response: Server[]) => response);
  }
}
