import { Logger } from '@nestjs/common';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from 'src/contexts/health/controllers/health.controller';
import { Language } from 'src/contexts/shared/enums/language.enum';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckService: HealthCheckService;

  const mockHealthCheckResult = {
    status: 'up' as const,
    info: {
      memory_heap: { status: 'up' },
      memory_rss: { status: 'up' },
    },
    error: {},
    details: {
      memory_heap: { status: 'up' },
      memory_rss: { status: 'up' },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn().mockResolvedValue(mockHealthCheckResult),
          },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: {
            checkHeap: jest.fn(),
            checkRSS: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  describe('run', () => {
    it('debería retornar el estado de salud del servicio con checks de memoria', async () => {
      const result = await healthController.run(Language.ES, 'UTC');

      expect(healthCheckService.check).toHaveBeenCalled();
      expect(result).toEqual(mockHealthCheckResult);
    });

    it('debería funcionar con diferentes idiomas y timezones', async () => {
      const result = await healthController.run(Language.EN, 'America/Lima');

      expect(healthCheckService.check).toHaveBeenCalled();
      expect(result).toEqual(mockHealthCheckResult);
    });
  });
});
