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

describe('CORS - Configuración (E2E)', () => {
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

  describe('Headers de CORS', () => {
    it('debería incluir header Access-Control-Allow-Origin', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://localhost:3000')
        .expect(200)
        .expect(res => {
          expect(res.headers['access-control-allow-origin']).toBeDefined();
        });
    });

    it('debería permitir origen wildcard (*) por defecto', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://cualquier-dominio.com')
        .expect(200)
        .expect(res => {
          expect(res.headers['access-control-allow-origin']).toBeDefined();
        });
    });
  });

  describe('Preflight Request (OPTIONS)', () => {
    it('debería manejar solicitudes OPTIONS preflight correctamente', () => {
      return request(app.getHttpServer())
        .options('/api/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'GET')
        .expect(res => {
          expect(res.headers['access-control-allow-methods']).toBeDefined();
          expect(res.headers['access-control-allow-headers']).toBeDefined();
        });
    });

    it('debería incluir métodos configurados en Access-Control-Allow-Methods', () => {
      return request(app.getHttpServer())
        .options('/api/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST')
        .expect(res => {
          const methods = res.headers['access-control-allow-methods'];
          expect(methods).toBeDefined();
          expect(methods).toContain('GET');
          expect(methods).toContain('POST');
        });
    });

    it('debería incluir headers configurados en Access-Control-Allow-Headers', () => {
      return request(app.getHttpServer())
        .options('/api/health')
        .set('Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Content-Type,Authorization')
        .expect(res => {
          const headers = res.headers['access-control-allow-headers'];
          expect(headers).toBeDefined();
          if (headers) {
            expect(headers.toLowerCase()).toContain('content-type');
            expect(headers.toLowerCase()).toContain('authorization');
          }
        });
    });
  });

  describe('Credentials', () => {
    it('debería respetar configuración de credentials según CORS_CREDENTIALS', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://localhost:3000')
        .expect(200)
        .expect(res => {
          const credentials = res.headers['access-control-allow-credentials'];
          const expectedCredentials = process.env.CORS_CREDENTIALS === 'true';

          if (expectedCredentials) {
            expect(credentials).toBe('true');
          } else {
            expect(credentials).toBeUndefined();
          }
        });
    });
  });
});
