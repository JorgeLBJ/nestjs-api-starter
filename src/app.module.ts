import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from './config/config.module';
import { HealthModule } from './contexts/health/health.module';
import { RequestContextInterceptor } from './contexts/shared/interceptors/request-context.interceptor';
import { LoggerModule } from './contexts/shared/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule, HealthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
