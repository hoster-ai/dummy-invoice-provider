import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ServerService } from './services/server.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { MongoModule } from './mongo/mongo.module';
import { PackageService } from './services/package.service';
import { Client } from './client/client.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigurationModule,
    MongoModule,
  ],
  controllers: [AppController],
  providers: [ServerService, PackageService, Client],
})
export class AppModule {}
