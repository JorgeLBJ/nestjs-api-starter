import * as Joi from 'joi';

import { EnvironmentVariables } from './env.types';
import { EnvironmentEnum } from './environment.enum';

export const envValidationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid(
      EnvironmentEnum.DEVELOPMENT,
      EnvironmentEnum.PRODUCTION,
      EnvironmentEnum.TEST,
    )
    .default(EnvironmentEnum.DEVELOPMENT),
  PORT: Joi.number().default(8000),
  LOGGER_LEVEL: Joi.string()
    .valid('log', 'error', 'warn', 'debug', 'verbose', 'fatal')
    .default('log'),
  CORS_ORIGIN: Joi.string().default('*'),
  CORS_METHODS: Joi.string().default('GET,HEAD,PUT,PATCH,POST,DELETE'),
  CORS_ALLOWED_HEADERS: Joi.string().default(
    'Content-Type,Authorization,Time-Zone',
  ),
  CORS_CREDENTIALS: Joi.boolean().default(false),
});
