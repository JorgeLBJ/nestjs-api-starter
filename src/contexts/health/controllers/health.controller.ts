import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { GetLanguage, GetTimeZone } from 'src/contexts/shared/decorators';
import { Language } from 'src/contexts/shared/enums';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Get()
  @HttpCode(200)
  @HealthCheck()
  run(@GetLanguage() language: Language, @GetTimeZone() timezone: string) {
    this.logger.log(
      `Estado del servicio de salud consultado - Language: ${language}, Timezone: ${timezone}`,
    );
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 1024 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 1024 * 1024 * 1024),
    ]);
  }
}
