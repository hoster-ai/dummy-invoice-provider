import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RequestDto } from 'src/dtos/data.request.dto';
import { DurationEnum } from '../src/enums/duration.enum';
import { CountryEnum } from '../src/enums/country.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const requestDto: RequestDto = {
    orderData: {
      orderId: 1,
      lines: [
        {
          name: 'GR domain',
          price: { value: 1, fee: 1, vat: 1 },
          startDate: new Date(),
          endDate: new Date(),
          duration: DurationEnum.ONE_YEAR,
        },
      ],
      summary: {
        fee: 1,
        value: 10,
        vat: 5,
      },
    },
    userData: {
      firstName: 'First',
      lastName: 'last',
      address1: 'GG2',
      city: 'Thess',
      companyName: 'Pin',
      country: CountryEnum.GREECE,
      email: 'email@example.com',
      id: 'id',
      postcode: '5330',
      telephone: '+30.69586848283',
    },
  };

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

  it('GET - /info get info', async () => {
    return request(app.getHttpServer())
      .get('/info')
      .auth('test', { type: 'bearer' })
      .expect(200)
      .then((res) => {
        expect(res.body.code).toBe(200);
      });
  });

  it('POST - /invoice', async () => {
    return request(app.getHttpServer())
      .post('/invoice')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
      });
  });

  it('POST - /invoice', async () => {
    requestDto.orderData.orderId = 200;

    return request(app.getHttpServer())
      .post('/invoice')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(false);
      });
  });

  it('POST - /invoice', async () => {
    requestDto.orderData.orderId = 600;

    return request(app.getHttpServer())
      .post('/invoice')
      .send(requestDto)
      .auth('test', { type: 'bearer' })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.invoice_pdf).toBe('url');
      });
  });
});
