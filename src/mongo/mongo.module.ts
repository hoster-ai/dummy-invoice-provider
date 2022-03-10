import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import * as mongoose from 'mongoose';
import { ConfigurationModule } from '../configuration/configuration.module';
import { Server } from './server.model';
import { Package } from './package.model';
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb.uri'),
        dbName: configService.get('mongodb.db'),
        user: configService.get('mongodb.username'),
        pass: configService.get('mongodb.password'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    TypegooseModule.forFeature([Server, Package]),
  ],
  controllers: [],
  providers: [], //services
  exports: [TypegooseModule],
})
export class MongoModule implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    mongoose.disconnect();
  }
}
