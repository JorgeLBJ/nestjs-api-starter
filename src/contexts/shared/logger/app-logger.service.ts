import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { AppConfigService } from '../../../config/app-config.service';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  constructor(
    private readonly cls: ClsService,
    private readonly configService: AppConfigService,
  ) {
    super();
    const level = this.configService.loggerLevel;
    this.setLogLevels([level ?? 'log']);
  }

  private getRequestId(): string | undefined {
    return this.cls.getId();
  }

  private formatLogMessage(message: unknown): string {
    const requestId = this.getRequestId();
    const formattedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);
    return requestId
      ? `[ReqId: ${requestId}] ${formattedMessage}`
      : formattedMessage;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    super.log(this.formatLogMessage(message), ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    super.error(this.formatLogMessage(message), ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    super.warn(this.formatLogMessage(message), ...optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    super.debug(this.formatLogMessage(message), ...optionalParams);
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    super.verbose(this.formatLogMessage(message), ...optionalParams);
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    super.fatal(this.formatLogMessage(message), ...optionalParams);
  }
}
