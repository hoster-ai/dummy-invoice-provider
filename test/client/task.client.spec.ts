import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Client } from '../../src/client/client.service';
import { AppModule } from '../../src/app.module';
import { Observable, of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: Client;
  let taskId: string;
  const mockTest = true;

  const result = {
    code: 200,
    message: 'Success_mock',
    data: {
      id: 'id',
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

  it('create task', async (done) => {
    if (mockTest) {
      result.code = 201;
      service.tasks.create = jest.fn();
      jest
        .spyOn(service.tasks, 'create')
        .mockImplementationOnce(async () => of(result));
    }

    await service.tasks
      .create({
        description: 'desc',
        startedDate: new Date(),
        completedDate: new Date(),
      })
      .then(async (res) => {
        if (res instanceof Observable) {
          res = await res.toPromise();
        }

        taskId = res.data.id;

        expect(res.code).toBe(201);
        result.code = 200;
        done();
      });
  });

  it('get task by description + provider id (token)', async (done) => {
    if (mockTest) {
      service.tasks.get = jest.fn();
      jest
        .spyOn(service.tasks, 'get')
        .mockImplementationOnce(async () => of(result));
    }

    return service.tasks.get(taskId).then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);
      expect(res.data.id).toBe(taskId);
      done();
    });
  });

  it('cancel task', async (done) => {
    if (mockTest) {
      service.tasks.update = jest.fn();
      jest
        .spyOn(service.tasks, 'update')
        .mockImplementationOnce(async () => of(result));

      result.data.status = 'CANCELED';
    }

    await service.tasks.update(taskId, 'cancel').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);
      expect(res.data.status).toBe('CANCELED');
      done();
    });
  });

  it('set task in-progress', async (done) => {
    if (mockTest) {
      service.tasks.update = jest.fn();
      jest
        .spyOn(service.tasks, 'update')
        .mockImplementationOnce(async () => of(result));

      result.data.status = 'IN_PROGRESS';
    }

    await service.tasks.update(taskId, 'in-progress').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);

      expect(res.data.status).toBe('IN_PROGRESS');
      done();
    });
  });

  it('complete task', async (done) => {
    if (mockTest) {
      service.tasks.update = jest.fn();
      jest
        .spyOn(service.tasks, 'update')
        .mockImplementationOnce(async () => of(result));

      result.data.status = 'COMPLETED';
    }

    await service.tasks.update(taskId, 'complete').then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);
      expect(res.data.status).toBe('COMPLETED');
      done();
    });
  });

  it('delete task', async () => {
    if (mockTest) {
      service.tasks.delete = jest.fn();
      jest
        .spyOn(service.tasks, 'delete')
        .mockImplementationOnce(async () => of(result));
    }

    return service.tasks.delete(taskId).then(async (res) => {
      if (res instanceof Observable) {
        res = await res.toPromise();
      }

      expect(res.code).toBe(200);
    });
  });
});
