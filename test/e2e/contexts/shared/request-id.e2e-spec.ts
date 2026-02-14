import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import request from 'supertest';

import { AppConfigService } from 'src/config/app-config.service';
import { AppModule } from 'src/app.module';

describe('Request ID (E2E)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.register(fastifyHelmet);

    const configService = app.get(AppConfigService);
    const corsOrigin = configService.corsOrigin;
    const corsMethods = configService.corsMethods;
    const corsAllowedHeaders = configService.corsAllowedHeaders;
    const corsCredentials = configService.corsCredentials;

    const originConfig =
      corsOrigin === '*' ? true : corsOrigin.split(',').map(o => o.trim());
    const methodsArray = corsMethods.split(',').map(m => m.trim());
    const headersArray = corsAllowedHeaders.split(',').map(h => h.trim());

    await app.register(fastifyCors, {
      origin: originConfig,
      methods: methodsArray,
      allowedHeaders: headersArray,
      credentials: corsCredentials,
    });

    app.setGlobalPrefix('api');

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería devolver un x-request-id en la respuesta cuando no se proporciona uno', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200);

    expect(response.headers['x-request-id']).toBeDefined();
    // Verificar que sea un UUID (formato básico)
    expect(response.headers['x-request-id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('debería devolver el mismo x-request-id proporcionado por el cliente', async () => {
    const customId = 'mi-id-personalizado-123';
    const response = await request(app.getHttpServer())
      .get('/api/health')
      .set('x-request-id', customId)
      .expect(200);

    expect(response.headers['x-request-id']).toBe(customId);
  });

  it('debería generar IDs diferentes para peticiones consecutivas', async () => {
    const res1 = await request(app.getHttpServer()).get('/api/health');
    const res2 = await request(app.getHttpServer()).get('/api/health');

    expect(res1.headers['x-request-id']).not.toBe(res2.headers['x-request-id']);
  });
});
