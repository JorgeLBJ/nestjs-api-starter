import { Global, Logger, Module } from '@nestjs/common';

import { AppLoggerService } from './app-logger.service';

@Global()
@Module({
  providers: [
    AppLoggerService,
    {
      provide: Logger,
      useExisting: AppLoggerService,
    },
  ],
  exports: [AppLoggerService, Logger],
})
export class LoggerModule {}
