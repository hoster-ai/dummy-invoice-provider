import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  const requestDto = {
    userData: {
      id: '5ce45d7606444f199acfba1e',
      parentId: '5ce45d7606444f199acfba1e',
      email: 'email@example.com',
      firstName: 'Fname',
      lastName: 'Lname',
      isCompany: false,
      companyName: 'string',
      telephone: '+30.2100000000',
      mobile: '+30.6900000000',
      address1: 'string',
      address2: 'string',
      address3: 'string',
      postcode: '545454',
      city: 'string',
      country: 'GB',
      state: 'string',
    },
    orderData: [
      {
        id: '5ce45d7606444f199acfba1e',
        options: {
          servers: ['linux23.name-servers.gr', 'linux24.name-servers.gr'],
        },
        meta: {
          private: {},
          public: {
            domain: 'domain.com',
            'service-plan': 'Pointer-Bronze',
            username: 'example',
            suspended: true,
          },
        },
        duration: '12',
        ips: [
          {
            address: '1.1.1.1',
            range: 0,
            type: 'IPv4',
          },
        ],
      },
    ],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET - /info - expect unauthorized', () => {
    return request(app.getHttpServer()).get('/info').expect(401);
  });

  it('GET - /info with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .get('/info')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });

  it('POST - /invoice - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/invoice').expect(401);
  });

  it('POST - /invoice with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .post('/invoice')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });
});
