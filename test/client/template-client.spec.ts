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
      resolved: false,
      id: '621394fee0d955e7177c59b1',
      title: 'title1',
      description: 'description1',
      parentId: '620f521538747782a5f34bb9',
      category: 'other',
      priority: 'low',
      actionsDone: ['action1'],
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

  it('create template', async (done) => {
    if (mockTest) {
      result.code = 201;
      service.templates.create = jest.fn();
      jest
        .spyOn(service.templates, 'create')
        .mockImplementationOnce(async () => of(result));
    }

    await service.templates
      .create({
        payload: {},
        language: LanguageEnum.LANG_AA,
        serviceProviderId: '621394fee0d955e7177c59b1',
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
});
