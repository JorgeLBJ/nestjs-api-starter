import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import fastifyHelmet from '@fastify/helmet';
import request from 'supertest';

import { AppModule } from 'src/app.module';

describe('Helmet - Headers de Seguridad (E2E)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.register(fastifyHelmet);
    app.setGlobalPrefix('api');

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería incluir header Content-Security-Policy', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(res => {
        expect(res.headers['content-security-policy']).toBeDefined();
      });
  });

  it('debería incluir header X-Content-Type-Options con valor nosniff', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(res => {
        expect(res.headers['x-content-type-options']).toBe('nosniff');
      });
  });

  it('debería incluir header X-Frame-Options', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(res => {
        expect(res.headers['x-frame-options']).toBeDefined();
      });
  });

  it('debería incluir header Strict-Transport-Security', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(res => {
        expect(res.headers['strict-transport-security']).toBeDefined();
      });
  });

  it('debería incluir header X-DNS-Prefetch-Control', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(res => {
        expect(res.headers['x-dns-prefetch-control']).toBeDefined();
      });
  });
});
