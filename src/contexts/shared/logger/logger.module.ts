import { Global, Logger, Module, Provider } from '@nestjs/common';

import { AppConfigService } from '../../../config/app-config.service';

const loggerProvider: Provider = {
  provide: Logger,
  useFactory: (configService: AppConfigService): Logger => {
    const level = configService.loggerLevel;
    const logger = new Logger();
    logger.localInstance.setLogLevels?.([level ?? 'log']);
    return logger;
  },
  inject: [AppConfigService],
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
