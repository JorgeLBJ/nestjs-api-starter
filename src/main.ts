import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyHelmet);

  const configService = app.get(AppConfigService);

  const corsOrigin = configService.corsOrigin;
  const corsMethods = configService.corsMethods;
  const corsAllowedHeaders = configService.corsAllowedHeaders;
  const corsCredentials = configService.corsCredentials;

  if (corsCredentials && corsOrigin === '*') {
    const errorMsg =
      'Invalid CORS configuration: credentials cannot be enabled with wildcard origin (*). ' +
      'Set CORS_ORIGIN to specific origins or disable CORS_CREDENTIALS.';
    throw new Error(errorMsg);
  }

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
  const port = configService.port;

  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log('Helmet security headers enabled');
  logger.log(
    `CORS enabled - Origin: ${corsOrigin}, Credentials: ${corsCredentials}`,
  );
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on('uncaughtException', handleError);
