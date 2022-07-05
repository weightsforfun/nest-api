import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get(`/movies`).expect(200).expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'abc',
          year: 2000,
          genre: ['asda', 'adss'],
        })
        .expect(201);
    });
    it('POST Error', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 123123,
          year: 2000,
          genre: ['asda', 'adss'],
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'updated' })
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
