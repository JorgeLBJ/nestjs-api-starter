import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { ConfigModule } from './config/config.module';
import { HealthModule } from './contexts/health/health.module';
import { RequestContextInterceptor } from './contexts/shared/interceptors/request-context.interceptor';
import { LoggerModule } from './contexts/shared/logger/logger.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: any) =>
          req.headers['x-request-id'] ?? crypto.randomUUID(),
      },
    }),
    ConfigModule,
    LoggerModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
