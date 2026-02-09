import { ConfigService as NestConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from 'src/config/app-config.service';
import { EnvironmentVariables } from 'src/config/env/env.types';

describe('AppConfigService', () => {
  let appConfigService: AppConfigService;
  let nestConfigService: NestConfigService<EnvironmentVariables, true>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: NestConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    appConfigService = module.get<AppConfigService>(AppConfigService);
    nestConfigService =
      module.get<NestConfigService<EnvironmentVariables, true>>(
        NestConfigService,
      );
  });

  describe('nodeEnv', () => {
    it('debería retornar el NODE_ENV configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('production');
      expect(appConfigService.nodeEnv).toBe('production');
    });

    it('debería retornar development cuando está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('development');
      expect(appConfigService.nodeEnv).toBe('development');
    });

    it('debería retornar test cuando está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('test');
      expect(appConfigService.nodeEnv).toBe('test');
    });
  });

  describe('port', () => {
    it('debería retornar el puerto configurado cuando está en el .env', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue(3000);
      expect(appConfigService.port).toBe(3000);
    });

    it('debería retornar el default del schema (8000) cuando no está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue(8000);
      expect(appConfigService.port).toBe(8000);
    });
  });

  describe('loggerLevel', () => {
    it('debería retornar el nivel de logger configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('debug');
      expect(appConfigService.loggerLevel).toBe('debug');
    });

    it('debería retornar el default del schema (log) cuando no está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('log');
      expect(appConfigService.loggerLevel).toBe('log');
    });

    it('debería retornar "error" cuando está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('error');
      expect(appConfigService.loggerLevel).toBe('error');
    });

    it('debería retornar "warn" cuando está configurado', () => {
      jest.spyOn(nestConfigService, 'get').mockReturnValue('warn');
      expect(appConfigService.loggerLevel).toBe('warn');
    });
  });
});
