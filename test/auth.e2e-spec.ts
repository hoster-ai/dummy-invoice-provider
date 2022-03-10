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
    productData: {
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

  it('POST - /create - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/create').expect(401);
  });

  it('POST - /create with authorization - expect 201 ', () => {
    return request(app.getHttpServer())
      .post('/create')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(201);
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

  it('POST - /renew - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/renew').expect(401);
  });

  it('POST - /renew with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .post('/renew')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });

  it('POST - /suspend - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/suspend').expect(401);
  });

  it('POST - /suspend with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .post('/suspend')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });

  it('POST - /unsuspend - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/unsuspend').expect(401);
  });

  it('POST - /unsuspend with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .post('/unsuspend')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });

  it('POST - /unsuspend - expect unauthorized', () => {
    return request(app.getHttpServer()).post('/unsuspend').expect(401);
  });

  it('POST - /unsuspend with authorization - expect 200 ', () => {
    return request(app.getHttpServer())
      .post('/unsuspend')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200);
  });
});
