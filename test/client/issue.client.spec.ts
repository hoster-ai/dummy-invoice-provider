import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Client } from '../../src/client/client.service';
import { AppModule } from '../../src/app.module';
import { Observable, of } from 'rxjs';
import { IssueCategoryEnum } from '../../src/enums/issues.category.enum';
import { IssuesPriorityEnum } from '../../src/enums/issues.priority.enum';

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

  it('create issue', async (done) => {
    if (mockTest) {
      result.code = 201;
      service.issues.create = jest.fn();
      jest
        .spyOn(service.issues, 'create')
        .mockImplementationOnce(async () => of(result));
    }

    await service.issues
      .create({
        title: 'title1',
        description: 'description1',
        category: IssueCategoryEnum.OTHER,
        priority: IssuesPriorityEnum.LOW,
        actionsDone: ['action1'],
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

  it('get issue', async (done) => {
    if (mockTest) {
      service.issues.get = jest.fn();
      jest
        .spyOn(service.issues, 'get')
        .mockImplementationOnce(async () => of(result));
    }

    await service.issues.get('title1').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res['code']).toBe(200);
      expect(res.data.title).toBe('title1');
      done();
    });
  });

  it('update issue', async (done) => {
    if (mockTest) {
      result.data.description = 'description2';
      service.issues.update = jest.fn();
      jest
        .spyOn(service.issues, 'update')
        .mockImplementationOnce(async () => of(result));
    }

    await service.issues
      .update('title1', {
        title: 'title1',
        description: 'description2',
        category: IssueCategoryEnum.OTHER,
        priority: IssuesPriorityEnum.LOW,
        actionsDone: ['action1'],
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        expect(res['code']).toBe(200);
        expect(res.data.description).toBe('description2');
        done();
      });
  });

  it('delete issue', async (done) => {
    if (mockTest) {
      service.issues.delete = jest.fn();
      jest
        .spyOn(service.issues, 'delete')
        .mockImplementationOnce(async () => of(result));
    }

    await service.issues.delete('title1').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res['code']).toBe(200);
      done();
    });
  });
});
