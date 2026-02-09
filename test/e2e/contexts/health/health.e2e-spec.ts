import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { HealthModule } from 'src/contexts/health/health.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect(response => {
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('info');
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('details');
        expect(['up', 'ok']).toContain(response.body.status);
        expect(response.body.info).toHaveProperty('memory_heap');
        expect(response.body.info).toHaveProperty('memory_rss');
        expect(response.body.details).toHaveProperty('memory_heap');
        expect(response.body.details).toHaveProperty('memory_rss');
      });
  });
});
