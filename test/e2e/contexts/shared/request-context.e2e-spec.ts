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

describe('Request Context - Language & TimeZone (E2E)', () => {
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

  describe('Accept-Language Header', () => {
    it('debería procesar correctamente Accept-Language: en', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'en')
        .expect(200);
    });

    it('debería procesar correctamente Accept-Language: en-US', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'en-US')
        .expect(200);
    });

    it('debería procesar correctamente Accept-Language: EN (uppercase)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'EN')
        .expect(200);
    });

    it('debería procesar correctamente Accept-Language: es', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'es')
        .expect(200);
    });

    it('debería procesar correctamente Accept-Language: es-ES', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'es-ES')
        .expect(200);
    });

    it('debería usar español por defecto cuando no hay Accept-Language', () => {
      return request(app.getHttpServer()).get('/api/health').expect(200);
    });

    it('debería usar español cuando Accept-Language es desconocido (francés)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'fr-FR')
        .expect(200);
    });

    it('debería usar español cuando Accept-Language es desconocido (portugués)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'pt-BR')
        .expect(200);
    });
  });

  describe('Time-Zone Header', () => {
    it('debería procesar correctamente Time-Zone: America/Lima', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'America/Lima')
        .expect(200);
    });

    it('debería procesar correctamente Time-Zone: UTC', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'UTC')
        .expect(200);
    });

    it('debería procesar correctamente Time-Zone: Europe/Madrid', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'Europe/Madrid')
        .expect(200);
    });

    it('debería procesar correctamente Time-Zone: America/New_York', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'America/New_York')
        .expect(200);
    });

    it('debería procesar correctamente Time-Zone: Asia/Tokyo', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'Asia/Tokyo')
        .expect(200);
    });

    it('debería usar UTC por defecto cuando no hay Time-Zone', () => {
      return request(app.getHttpServer()).get('/api/health').expect(200);
    });

    it('debería usar UTC cuando Time-Zone es inválido', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', 'Invalid/Zone')
        .expect(200);
    });

    it('debería usar UTC cuando Time-Zone es string vacío', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Time-Zone', '')
        .expect(200);
    });
  });

  describe('Ambos Headers Juntos', () => {
    it('debería procesar ambos headers correctamente (en + America/Lima)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'en')
        .set('Time-Zone', 'America/Lima')
        .expect(200);
    });

    it('debería procesar ambos headers correctamente (es + Europe/Madrid)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'es')
        .set('Time-Zone', 'Europe/Madrid')
        .expect(200);
    });

    it('debería procesar ambos headers correctamente (en-US + UTC)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Accept-Language', 'en-US')
        .set('Time-Zone', 'UTC')
        .expect(200);
    });

    it('debería usar defaults cuando ambos headers están ausentes', () => {
      return request(app.getHttpServer()).get('/api/health').expect(200);
    });
  });
});
