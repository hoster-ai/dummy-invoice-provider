import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { ServerService } from '../src/services/server.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: ServerService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    service = app.get<ServerService>(ServerService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('defined', async () => {
    expect(service).toBeDefined();
  });

  it.only('create server', async () => {
    return service
      .create({
        parentId: 'id',
        host: 'host',
        password: 'secret',
        server: 'linux24.name-servers.gr',
      })
      .then((response) => {
        expect(response.server).toBe('linux24.name-servers.gr');
      });
  });
});
