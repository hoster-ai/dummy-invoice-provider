import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PackageService } from '../src/services/package.service';
import { of } from 'rxjs';
import { AppController } from '../src/app.controller';
import { CountryEnum } from '../src/enums/country.enum';
import { DurationEnum } from '../src/enums/duration.enum';
import { IpTypeEnum } from '../src/enums/ip-type.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let packageService: PackageService;
  let controller: AppController;

  const result = {
    code: 200,
    message: 'Success_mock',
    data: 'taskid',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    packageService = app.get<PackageService>(PackageService);
    controller = app.get<AppController>(AppController);
    await app.init();
  });

  afterAll(async () => {
    await packageService.purge();
    await app.close();
  });

  it('GET - /info get info', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .get('/info')
      .auth('test', { type: 'bearer' })
      .expect(200)
      .then((res) => {
        expect(res.body.info.actionFields[0].label).toBe('Service Plan');
        expect(Object.values(res.body.info.actionFields[0].value).length).toBe(
          3,
        );
      });
  });

  it('POST - /create - expect wrong server', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/create')
      .auth('test', { type: 'bearer' })
      .send({
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
            servers: ['linuxtest23.name-servers.gr', 'linux24.name-servers.gr'],
          },
          meta: {
            private: {},
            public: { domain: 'domain.com', 'service-plan': 'Pointer-Bronze' },
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
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Error');
        expect(res.body.errors.includes('Invalid server')).toBeTruthy();
      });
  });

  it('POST - /create - success', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/create')
      .auth('test', { type: 'bearer' })
      .send({
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
            public: { domain: 'domain.com', 'service-plan': 'Pointer-Bronze' },
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
      })
      .expect(201)
      .then((res) => {
        expect(res.body.meta.private.host).toBeDefined();
        expect(res.body.meta.private.password).toBeDefined();
        expect(res.body.meta.public.username).toBe(
          'Fna_5ce45d7606444f199acfba1e',
        );
        expect(res.body.meta.public.domain).toBe('domain.com');
        expect(res.body.meta.public.server).toBeDefined();
      });
  });

  it('POST - /suspend - success', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/suspend')
      .auth('test', { type: 'bearer' })
      .send({
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
      })
      .expect(200)
      .then((res) => {
        expect(res.body.meta.public.suspended).toBe(true);
      });
  });

  it('POST - /suspend - expect error', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/suspend')
      .auth('test', { type: 'bearer' })
      .send({
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
              username: 'example_test',
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
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors).toBe('Could not suspend account');
      });
  });

  it('POST - /unsuspend - expect error', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/unsuspend')
      .auth('test', { type: 'bearer' })
      .send({
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
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors).toBe('Account is not suspended');
      });
  });

  it('POST - /unsuspend - expect error', async () => {
    await packageService.create({ name: 'package1', parentId: '1' });
    await packageService.create({ name: 'package2', parentId: '1' });
    await packageService.create({ name: 'package3', parentId: '1' });

    return request(app.getHttpServer())
      .post('/unsuspend')
      .auth('test', { type: 'bearer' })
      .send({
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
      })
      .expect(200)
      .then((res) => {
        expect(res.body.meta.public.suspended).toBe(false);
      });
  });

  it.only('POST - /create - expect mocked response', async () => {
    result.code = 201;
    controller.create = jest.fn();
    jest
      .spyOn(controller, 'create')
      .mockImplementationOnce(async () => of(result).toPromise());

    return controller
      .create({
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
          country: CountryEnum.AFGHANISTAN,
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
          duration: DurationEnum.EIGHT_MONTHS,
          ips: [
            {
              address: '1.1.1.1',
              range: 0,
              type: IpTypeEnum.IPv4,
            },
          ],
        },
      })
      .then((res) => {
        console.log(res);
      });
  });
});
