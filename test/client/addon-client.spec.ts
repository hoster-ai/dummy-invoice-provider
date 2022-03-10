import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Client } from '../../src/client/client.service';
import { AppModule } from '../../src/app.module';
import { LanguageEnum } from '../../src/enums/language.enum';
import { LabelTypeEnum } from '../../src/enums/label.type.enum';
import { Observable, of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: Client;
  const mockTest = true;

  const result = {
    code: 201,
    message: 'Success_mock',
    data: {
      id: '620f527138747782a5f34bc5',
      title: [
        {
          language: 'en',
          text: 'str',
        },
      ],
      name: 'hostname',
      description: [
        {
          language: 'en',
          text: 'str',
        },
      ],
      icon_url: 'url',
      type: 'CHECKBOX',
      required: true,
      active: true,
      pricePolicies: [],
      options: [],
      deletable: false,
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

  it('create addon', async (done) => {
    if (mockTest) {
      service.addons.create = jest.fn();
      jest
        .spyOn(service.addons, 'create')
        .mockImplementationOnce(async () => of(result));
    }

    await service.addons
      .create({
        active: true,
        description: [
          {
            language: LanguageEnum.LANG_GREEK,
            text: 'lala',
          },
        ],
        title: [
          {
            language: LanguageEnum.LANG_GREEK,
            text: 'lala',
          },
        ],
        icon_url: 'url',
        name: 'hostname',
        required: true,
        deletable: false,
        editable: false,
        type: LabelTypeEnum.CHECKBOX,
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        expect(res.code).toBe(201);
        done();
      });
  });

  it('get addon by name', async (done) => {
    if (mockTest) {
      result.code = 200;
      service.addons.get = jest.fn();
      jest
        .spyOn(service.addons, 'get')
        .mockImplementationOnce(async () => of(result));
    }

    return service.addons.get('hostname').then(async (res) => {
      res = await res.toPromise();
      expect(res.code).toBe(200);
      expect(res.data.name).toBe('hostname');
      done();
    });
  });

  it('update addon', async (done) => {
    if (mockTest) {
      result.code = 200;
      service.addons.update = jest.fn();
      jest
        .spyOn(service.addons, 'update')
        .mockImplementationOnce(async () => of(result));

      result.data.name = 'hostname2';
    }

    await service.addons
      .update('hostname', {
        title: [
          {
            language: LanguageEnum.LANG_EN,
            text: 'str',
          },
        ],
        name: 'hostname2',
        description: [
          {
            language: LanguageEnum.LANG_EN,
            text: 'str',
          },
        ],
        icon_url: 'url',
        type: LabelTypeEnum.CHECKBOX,
        required: true,
        active: true,
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        expect(res.code).toBe(200);
        expect(res.data.name).toBe('hostname2');
        done();
      });
  });

  it('delete addon', async () => {
    if (mockTest) {
      result.code = 200;
      service.addons.delete = jest.fn();
      jest
        .spyOn(service.addons, 'delete')
        .mockImplementationOnce(async () => of(result));
    }

    return service.addons.delete('hostname2').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);
    });
  });
});
