import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env/env.types';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly nestConfigService: NestConfigService<
      EnvironmentVariables,
      true
    >,
  ) {}

  /**
   * Obtiene el entorno de ejecución actual
   * @returns El entorno actual ('development', 'production' o 'test')
   * @default 'development'
   */
  get nodeEnv(): EnvironmentVariables['NODE_ENV'] {
    return this.nestConfigService.get('NODE_ENV', { infer: true })!;
  }

  /**
   * Obtiene el puerto en el que el servidor debe escuchar
   * @returns Número de puerto
   * @default 8000
   */
  get port(): number {
    return this.nestConfigService.get('PORT', { infer: true })!;
  }

  /**
   * Obtiene el nivel de logging configurado
   * @returns Nivel de log
   * @default 'log'
   */
  get loggerLevel(): EnvironmentVariables['LOGGER_LEVEL'] {
    return this.nestConfigService.get('LOGGER_LEVEL', { infer: true })!;
  }

  /**
   * Obtiene los orígenes permitidos para CORS
   * @returns Orígenes CORS (string separado por comas o '*')
   * @default '*'
   */
  get corsOrigin(): string {
    return this.nestConfigService.get('CORS_ORIGIN', { infer: true })!;
  }

  /**
   * Obtiene los métodos HTTP permitidos para CORS
   * @returns Métodos HTTP (string separado por comas)
   * @default 'GET,HEAD,PUT,PATCH,POST,DELETE'
   */
  get corsMethods(): string {
    return this.nestConfigService.get('CORS_METHODS', { infer: true })!;
  }

  /**
   * Obtiene los headers permitidos en requests CORS
   * @returns Headers permitidos (string separado por comas)
   * @default 'Content-Type,Authorization'
   */
  get corsAllowedHeaders(): string {
    return this.nestConfigService.get('CORS_ALLOWED_HEADERS', { infer: true })!;
  }

  /**
   * Obtiene si las credentials están habilitadas para CORS
   * @returns true si credentials están habilitadas
   * @default false
   */
  get corsCredentials(): boolean {
    return this.nestConfigService.get('CORS_CREDENTIALS', { infer: true })!;
  }
}
