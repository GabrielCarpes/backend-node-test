import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Transaction API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    await app.init();
  });

  afterEach(async () => {
    await request(app.getHttpServer())
      .delete('/transactions')
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /transactions → should create a transaction', async () => {
    const payload = {
      amount: 100.25,
      timestamp: new Date().toISOString()
    };

    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send(payload)
      .expect(201);

    expect(response.body).toEqual({});
  });

  it('POST /transactions → should return 422 for future timestamp', async () => {
    const futureDate = new Date(Date.now() + 60000).toISOString();

    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 100,
        timestamp: futureDate
      })
      .expect(422);
  });

  it('GET /stats → should return stats', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/stats')
      .expect(200);

    expect(response.body).toMatchObject({
      count: expect.any(Number),
      sum: expect.any(Number),
      avg: expect.any(Number),
      min: expect.any(Number),
      max: expect.any(Number),
    });
  });

  it('GET /transactions/stats → should return empty stats if no transactions in the last 60 seconds', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/stats')
      .expect(200);
  
    expect(response.body).toMatchObject({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
  

  it('DELETE /transactions → should delete all transactions', async () => {
    await request(app.getHttpServer())
      .delete('/transactions')
      .expect(204);
  });
});
