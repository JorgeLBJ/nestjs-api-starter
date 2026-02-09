export interface EnvironmentVariables {
  /**
   * Entorno de ejecución de la aplicación
   * @default 'development'
   */
  NODE_ENV: 'development' | 'production' | 'test';

  /**
   * Puerto en el que el servidor escuchará peticiones
   */
  PORT?: number;

  /**
   * Nivel de logging de la aplicación
   * @default 'log'
   */
  LOGGER_LEVEL?: 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

  /**
   * Orígenes permitidos para CORS (separados por coma)
   * @example 'http://localhost:3000,https://miapp.com'
   * @default '*' (todos los orígenes)
   */
  CORS_ORIGIN?: string;

  /**
   * Métodos HTTP permitidos para CORS
   * @default 'GET,HEAD,PUT,PATCH,POST,DELETE'
   */
  CORS_METHODS?: string;

  /**
   * Headers permitidos en requests CORS
   * @default 'Content-Type,Authorization,Time-Zone'
   */
  CORS_ALLOWED_HEADERS?: string;

  /**
   * Habilitar envío de credentials (cookies, auth headers) en CORS
   * @default false
   */
  CORS_CREDENTIALS?: boolean;
}
