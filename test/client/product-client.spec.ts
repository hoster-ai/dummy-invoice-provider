import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Client } from '../../src/client/client.service';
import { AppModule } from '../../src/app.module';
import { Observable, of } from 'rxjs';
import { LanguageEnum } from '../../src/enums/language.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: Client;
  const mockTest = true;

  const result = {
    code: 200,
    message: 'Success_mock',
    data: {
      id: 'id',
      name: 'name1',
      description: 'description',
      createdFromProviderId: 'providerId',
      action: 'create',
      status: 'pending',
      startedDate: new Date(),
      completedDate: new Date(),
      payload: {},
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    service = app.get<Client>(Client);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('defined', async () => {
    expect(service).toBeDefined();
  });

  it('create product', async (done) => {
    if (mockTest) {
      result.code = 201;
      service.products.create = jest.fn();
      jest
        .spyOn(service.products, 'create')
        .mockImplementationOnce(async () => of(result));
    }

    await service.products
      .create({
        name: 'name1',
        userId: '5e07158925ddae1f53b621fc',
        categoryId: '5e07158925ddae1f53b621fc',
        providerId: '5e07158925ddae1f53b621fc',
        defaultPrices: [
          {
            policy: { default: true, title: 'title1', description: 'descr1' },
          },
        ],
        title: [{ language: LanguageEnum.LANG_GREEK, text: 'title1' }],
        description: [{ language: LanguageEnum.LANG_GREEK, text: 'title1' }],
        activeVersion: true,
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        expect(res['code']).toBe(201);
        result.code = 200;
        done();
      });
  });

  it('get product', async (done) => {
    if (mockTest) {
      service.products.get = jest.fn();
      jest
        .spyOn(service.products, 'get')
        .mockImplementationOnce(async () => of(result));
    }

    await service.products.get('name1').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res['code']).toBe(200);
      expect(res['data'].name).toBe('name1');
      done();
    });
  });

  it('update product', async (done) => {
    if (mockTest) {
      result.data.name = 'name2';
      service.products.update = jest.fn();
      jest
        .spyOn(service.products, 'update')
        .mockImplementationOnce(async () => of(result));
    }

    await service.products
      .update('name1', {
        name: 'name2',
        userId: '5e07158925ddae1f53b621fc',
        categoryId: '5e07158925ddae1f53b621fc',
        providerId: '5e07158925ddae1f53b621fc',
        defaultPrices: [
          {
            policy: { default: true, title: 'title1', description: 'descr1' },
          },
        ],
        title: [{ language: LanguageEnum.LANG_GREEK, text: 'title1' }],
        description: [{ language: LanguageEnum.LANG_GREEK, text: 'title1' }],
        activeVersion: true,
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        expect(res['code']).toBe(200);
        expect(res['data'].name).toBe('name2');
        done();
      });
  });

  it('delete product', async (done) => {
    if (mockTest) {
      service.products.delete = jest.fn();
      jest
        .spyOn(service.products, 'delete')
        .mockImplementationOnce(async () => of(result));
    }

    await service.products.delete('name2').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res['code']).toBe(200);
      done();
    });
  });
});
