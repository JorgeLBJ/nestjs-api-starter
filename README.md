<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/nestjs.png" alt="Nest Logo" width="512" /></a>
</p>

<h1 align="center">⭐ Plantilla NestJS para Producción ⭐</h1>

<p align="center">
  Plantilla base para nuevos servicios con NestJS, listo para producción
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v24.x/api/index.html"><img src="https://img.shields.io/badge/node-24.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.7-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v11/"><img src="https://img.shields.io/badge/nestjs-11.x-red.svg" alt="nestjs"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized_🐳-blue.svg" alt="docker"/></a>
</p>

## 🌟 ¿Qué incluye esta plantilla?

Esta plantilla va más allá de un proyecto NestJS básico. Incluye configuraciones y herramientas esenciales para comenzar a desarrollar de inmediato:

### Core Framework

1. **⚡ Fastify en lugar de Express** - Mayor rendimiento y menor overhead. [NestJS es compatible con Fastify](https://docs.nestjs.com/techniques/performance) y ofrece hasta 2x mejor rendimiento que Express en benchmarks.
2. **🏗️ NestJS 11** - Última versión del framework con todas las mejoras y características más recientes.
3. **📝 TypeScript 5.7 en modo strict** - Máxima seguridad de tipos para prevenir errores en tiempo de compilación.

### Desarrollo y Calidad de Código

4. **🔍 ESLint 9 (flat config)** - Configuración moderna de linting con:
   - TypeScript ESLint (reglas recomendadas + type-checked)
   - Unicorn (mejores prácticas de JavaScript)
   - Simple Import Sort (organización automática de imports)
   - Prettier integrado (formateo consistente)

5. **🎨 Prettier** - Formateo de código automático y consistente.

6. **🐶 Husky + lint-staged** - Git hooks para:
   - Pre-commit: lint y formateo automático solo en archivos modificados
   - Commit-msg: validación de conventional commits
   - Pre-push: ejecución de build y tests

7. **✅ Conventional Commits** - Commits estandarizados con commitlint.

### Testing

8. **🧪 Jest configurado** - Testing unitario y e2e listo para usar:
   - Configuración de unit tests
   - Configuración de tests e2e
   - Coverage reports

### Docker y Deployment

9. **🐳 Docker multi-stage optimizado** - Imágenes Docker para desarrollo y producción:
   - Imagen de desarrollo con hot-reload y debugging
   - Imagen de producción optimizada y ligera
   - BuildKit cache mounts para builds más rápidos
   - Node 24 Alpine (imagen mínima)

### Configuración

10. **📦 Validación de variables de entorno** - Usando Joi para validar configuración en startup.
11. **🔧 Logger configurable** - Módulo de logging global con niveles configurables.

### Seguridad

12. **🛡️ Helmet** - Headers de seguridad HTTP automáticos (CSP, X-Frame-Options, HSTS, etc).
13. **🌐 CORS** - Configuración completa de CORS mediante variables de entorno con validación de seguridad.

### Arquitectura

14. **🏛️ Arquitectura por contextos** - Organización inspirada en DDD:
    - Separación clara por dominios de negocio
    - Contextos auto-contenidos
    - Escalabilidad para proyectos grandes

## 📁 Estructura del Proyecto

```
nestjs-api-starter/
├── src/
│   ├── config/                    # Configuraciones globales
│   │   ├── app-config.service.ts  # Servicio de configuración tipado
│   │   ├── config.module.ts       # Módulo de configuración
│   │   └── env/                   # Variables de entorno
│   │       ├── env.schema.ts      # Schema Joi de validación
│   │       ├── env.types.ts       # Interface TypeScript
│   │       └── environment.enum.ts
│   ├── contexts/                  # Contextos de negocio
│   │   ├── health/               # Ejemplo: contexto de health check
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dtos/
│   │   │   ├── enums/
│   │   │   └── health.module.ts
│   │   └── shared/               # Módulos compartidos
│   │       ├── logger/           # Logger global
│   │       ├── decorators/       # Decorators personalizados
│   │       ├── interceptors/     # Interceptors globales
│   │       ├── utils/            # Utilidades compartidas
│   │       ├── types/            # Tipos compartidos
│   │       └── enums/            # Enums compartidos
│   ├── app.module.ts             # Módulo raíz
│   └── main.ts                   # Punto de entrada
├── test/                          # Tests (estructura espejo de src/)
│   ├── unit/                     # Tests unitarios
│   │   ├── config/
│   │   └── contexts/
│   ├── e2e/                      # Tests e2e
│   │   └── contexts/
│   ├── jest-e2e.json             # Configuración Jest e2e
│   └── README.md                 # Documentación de estructura de tests
├── Dockerfile                     # Multi-stage Dockerfile
├── docker-compose.yml            # Orquestación de contenedores
├── eslint.config.mjs             # Configuración ESLint (flat config)
├── tsconfig.json                 # Configuración TypeScript (strict mode)
└── package.json
```

## 📋 Estándares de Código

Este proyecto sigue un conjunto de estándares de código para mantener consistencia y calidad. Estas reglas se aplican tanto para desarrollo humano como asistido por IA.

### Reglas Principales

- **Variables**: Siempre en inglés, camelCase y con nombres expresivos que se entiendan por sí mismos
- **Archivos**: Nombres en inglés siguiendo el estándar de NestJS `{nombre}.{tipo}.ts`
  - Ejemplo: `users.controller.ts`, `create-user.dto.ts`, `health.module.ts`
  - Nombres compuestos: `user-products.service.ts` (minúsculas con guiones)
- **Comentarios**: Solo cuando sean estrictamente necesarios, en español
- **Sin documentación innecesaria**: El código debe ser autodescriptivo
- **Sin emojis**: Código profesional y limpio

### Ejemplos

```typescript
// ✅ Correcto - Variable expresiva en inglés y camelCase
const daysUntilExpiration = 30;

// ❌ Incorrecto - Variable corta sin contexto
const days = 30;

// ✅ Correcto - Nombre de archivo siguiendo estándar NestJS
// user-products.service.ts

// ❌ Incorrecto - Nombre de archivo sin formato estándar
// userProducts.service.ts
```

### Documentación Completa para IAs

Este proyecto incluye el archivo `AGENTS.md` con reglas detalladas y específicas para que las IAs generen código siguiendo estos estándares. Si trabajas con herramientas de IA como Copilot, Cursor, o similares, el sistema ya está configurado para aplicar estas reglas automáticamente.

Para ver la documentación completa detallada, consulta el archivo [AGENTS.md](./AGENTS.md).

### Arquitectura por Contextos

Esta plantilla usa una organización basada en **contextos** en lugar de la estructura tradicional de `controllers/`, `services/`, etc:

- **Ventajas:**
  - Mejor organización para proyectos grandes
  - Cada contexto es auto-contenido
  - Fácil de entender qué hace cada parte
  - Escalable y mantenible

- **¿Cuándo usar cada carpeta?**
  - `contexts/[nombre]/`: Para cada dominio o feature de tu aplicación
  - `contexts/shared/`: Para código compartido entre contextos (logger, utils, types)
  - `config/`: Para configuraciones globales de la aplicación

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 24.x (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- Docker y Docker Compose (opcional, para desarrollo dockerizado)
- npm 10.x

### Instalación

1. **Clona o usa esta plantilla:**

   ```bash
   git clone <tu-repo>
   cd nestjs-api-starter
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` según tus necesidades:

   ```env
   # Application
   NODE_ENV=development
   PORT=8000

   # Logging
   LOGGER_LEVEL=log

   # CORS
   CORS_ORIGIN=*
   CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
   CORS_ALLOWED_HEADERS=Content-Type,Authorization,Time-Zone
   CORS_CREDENTIALS=false
   ```

4. **Inicia el proyecto:**

   **Opción A - Desarrollo local:**

   ```bash
   npm run start:dev
   ```

   **Opción B - Con Docker (recomendado):**

   ```bash
   docker-compose up my-service-dev
   ```

5. **Verifica que funciona:**

   ```bash
   curl http://localhost:8000/api/health
   ```

   Deberías recibir: `{"status":"OK"}`

## 📜 Scripts Disponibles

| Script                | Descripción                                           |
| --------------------- | ----------------------------------------------------- |
| `npm run build`       | Compila el proyecto TypeScript a JavaScript           |
| `npm start`           | Ejecuta la aplicación compilada (producción)          |
| `npm run start:dev`   | Inicia en modo desarrollo con hot-reload              |
| `npm run dev`         | Alias de start:dev con debugging habilitado           |
| `npm run start:debug` | Inicia con debugger para conectar IDE                 |
| `npm run start:prod`  | Inicia la versión compilada en modo producción        |
| `npm run lint`        | Ejecuta el linter en todo el proyecto                 |
| `npm run lint:fix`    | Ejecuta el linter y arregla problemas automáticamente |
| `npm run format`      | Formatea todo el código con Prettier                  |
| `npm test`            | Ejecuta los tests unitarios                           |
| `npm run test:watch`  | Ejecuta tests en modo watch                           |
| `npm run test:cov`    | Ejecuta tests y genera reporte de cobertura           |
| `npm run test:e2e`    | Ejecuta los tests end-to-end                          |

## 🐳 Uso con Docker

### Modo Desarrollo

El modo desarrollo incluye hot-reload y puerto de debugging expuesto:

```bash
docker-compose up my-service-dev
```

Características:

- ✅ Hot reload activado (cambios en `src/` se reflejan automáticamente)
- ✅ Puerto 9229 expuesto para debugging
- ✅ Variables de entorno desde `.env`
- ✅ Volumen montado en `./src` para desarrollo

**Debugging con VSCode:**

Crea `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

### Modo Producción

Imagen optimizada y ligera para producción:

```bash
docker-compose up my-service-production
```

Características:

- ✅ Multi-stage build optimizado
- ✅ Solo dependencias de producción
- ✅ Usuario no-root para seguridad
- ✅ Imagen Alpine (mínima)
- ✅ dumb-init para manejo correcto de señales

### Detener los servicios

```bash
docker-compose down
```

## 🧪 Testing

Este proyecto utiliza una arquitectura de tests separada del código de producción, manteniendo una estructura espejo del directorio `src/`.

### Estructura de Tests

```
test/
├── unit/                          # Tests unitarios (espejo de src/)
│   ├── config/
│   │   └── app-config.service.spec.ts
│   └── contexts/
│       └── health/
│           └── controllers/
│               └── health.controller.spec.ts
│
└── e2e/                           # Tests e2e (espejo de src/)
    └── contexts/
        └── health/
            └── health.e2e-spec.ts
```

### Tests Unitarios

```bash
npm test              # Ejecutar todos los tests unitarios
npm run test:watch    # Ejecutar tests en modo watch
npm run test:cov      # Ejecutar tests y generar reporte de cobertura
```

Los tests unitarios prueban funciones/métodos individuales en aislamiento y se encuentran en `test/unit/`.

### Tests E2E

```bash
npm run test:e2e
```

Los tests e2e prueban flujos completos integrando múltiples módulos y se encuentran en `test/e2e/`.

### Imports en Tests

Todos los tests usan **imports absolutos con el alias `src/`**:

```typescript
// ✅ Correcto - Import absoluto con alias
import { AppConfigService } from 'src/config/app-config.service';

// ❌ Incorrecto - Import relativo largo
import { AppConfigService } from '../../../src/config/app-config.service';
```

### Documentación Completa

Para más detalles sobre la estructura de tests, convenciones y mejores prácticas, consulta el archivo [test/README.md](test/README.md).

> 💡 **Nota:** Los estándares de código de este proyecto (nomenclatura, naming conventions, etc.) se detallan en la sección [📋 Estándares de Código](#-estándares-de-código) y en profundidad en [AGENTS.md](./AGENTS.md).

## 🔍 Linting y Formateo

### ESLint

Esta plantilla usa ESLint 9 con el nuevo **flat config** (`eslint.config.mjs`):

```bash
# Verificar problemas
npm run lint

# Arreglar automáticamente
npm run lint:fix
```

**Reglas incluidas:**

- TypeScript ESLint (recommended + type-checked)
- Unicorn (mejores prácticas de JavaScript/Node.js)
- Prettier (formateo)
- Simple Import Sort (organización de imports)

### Prettier

```bash
npm run format
```

Configuración en `.prettierrc`.

## 🪝 Git Hooks y Conventional Commits

### Hooks Configurados

Esta plantilla usa **Husky** para ejecutar hooks de git automáticamente:

1. **pre-commit**: Ejecuta `lint-staged`
   - Solo analiza archivos que están en staging
   - Ejecuta ESLint con --fix
   - Ejecuta Prettier
   - Si falla, el commit es rechazado

2. **commit-msg**: Valida que el mensaje siga [Conventional Commits](https://www.conventionalcommits.org/)
   - Formato: `type(scope?): subject`
   - Ejemplos válidos:
     - `feat: agregar endpoint de usuarios`
     - `fix(auth): corregir validación de tokens`
     - `docs: actualizar README`
   - Si el mensaje no es válido, el commit es rechazado

3. **pre-push**: Ejecuta validaciones antes de push
   - `npm run build` - verifica que compile
   - `npm test` - verifica que los tests pasen
   - Si falla, el push es rechazado

### Tipos de Commit Válidos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan el código)
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Agregar o modificar tests
- `chore`: Cambios en el build o herramientas
- `ci`: Cambios en CI/CD

## ⚙️ Configuración

### Variables de Entorno

#### Application

| Variable       | Descripción          | Default       | Valores                                             |
| -------------- | -------------------- | ------------- | --------------------------------------------------- |
| `NODE_ENV`     | Entorno de ejecución | `development` | `development`, `production`, `test`                 |
| `PORT`         | Puerto del servidor  | `8000`        | Cualquier puerto válido                             |
| `LOGGER_LEVEL` | Nivel de logging     | `log`         | `log`, `error`, `warn`, `debug`, `verbose`, `fatal` |

#### CORS (Seguridad)

| Variable               | Descripción                              | Default                                |
| ---------------------- | ---------------------------------------- | -------------------------------------- |
| `CORS_ORIGIN`          | Orígenes permitidos (separados por coma) | `*`                                    |
| `CORS_METHODS`         | Métodos HTTP permitidos                  | `GET,HEAD,PUT,PATCH,POST,DELETE`       |
| `CORS_ALLOWED_HEADERS` | Headers permitidos en requests           | `Content-Type,Authorization,Time-Zone` |
| `CORS_CREDENTIALS`     | Permitir credentials/cookies             | `false`                                |

**Validación:** Todas las variables se validan en startup usando Joi. Si falta alguna requerida o tiene un valor inválido, la aplicación no arranca.

### ConfigService Tipado

Esta plantilla incluye un `ConfigService` tipado que proporciona **type safety** y **autocomplete** para todas las variables de entorno.

**✨ Ventajas:**

- ✅ **Autocomplete en tu IDE** - IntelliSense te muestra todas las variables disponibles
- ✅ **Tipos garantizados** - No solo anotaciones, tipos reales de TypeScript
- ✅ **Valores por defecto centralizados** - No necesitas repetir `?? defaultValue`
- ✅ **Prevención de typos** - Los errores en nombres se detectan en compilación
- ✅ **Refactoring seguro** - Cambiar nombres actualiza todos los usos

**Uso básico:**

```typescript
import { AppConfigService } from './config/app-config.service';

@Injectable()
export class MiServicio {
  constructor(private readonly configService: AppConfigService) {}

  metodo(): void {
    // ✅ Con autocomplete y tipo number garantizado
    const port = this.configService.port;

    // ✅ Con autocomplete y union type
    const env = this.configService.nodeEnv; // 'development' | 'production' | 'test'

    // ✅ Valores por defecto ya incluidos
    const level = this.configService.loggerLevel; // 'log' por defecto
  }
}
```

**Comparación con el enfoque tradicional:**

```typescript
// ❌ Antes (sin type safety)
const port = configService.get<number>('PORT') ?? 8000;
// Problemas: sin autocomplete, typos no detectados, repetir defaults

// ✅ Ahora (con type safety)
const port = configService.port;
// Ventajas: autocomplete, tipos garantizados, defaults centralizados
```

### Agregar nuevas variables de entorno

Para agregar una nueva variable de entorno al proyecto:

**1. Define el tipo en la interface TypeScript** (`src/config/env/env.types.ts`):

```typescript
export interface EnvironmentVariables {
  // ... variables existentes
  DATABASE_URL: string;
  JWT_SECRET: string;
  API_TIMEOUT?: number; // Opcional
}
```

**2. Agrega validación Joi** (`src/config/env/env.schema.ts`):

```typescript
export const envConfigValidationSchema = Joi.object<EnvironmentVariables>({
  // ... variables existentes
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  API_TIMEOUT: Joi.number().default(5000), // Con valor por defecto
});
```

**3. Agrega getter en el AppConfigService** (`src/config/app-config.service.ts`):

```typescript
get databaseUrl(): string {
  return this.nestConfigService.get('DATABASE_URL', { infer: true })!;
}

get jwtSecret(): string {
  return this.nestConfigService.get('JWT_SECRET', { infer: true })!;
}

get apiTimeout(): number {
  return this.nestConfigService.get('API_TIMEOUT', { infer: true }) ?? 5000;
}
```

**Nota sobre los defaults:**

- Usa `!` (non-null assertion) cuando Joi tiene `.required()` o `.default()`
- Usa `?? defaultValue` para redundancia explícita (recomendado para documentación)
- Para variables opcionales, retorna `T | undefined`

**4. Actualiza `.env.example`:**

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=tu-secreto-super-seguro-de-32-caracteres
API_TIMEOUT=5000
```

**5. ¡Listo!** Ahora puedes usar:

```typescript
const dbUrl = this.configService.databaseUrl; // string (con autocomplete)
const secret = this.configService.jwtSecret; // string
const timeout = this.configService.apiTimeout; // number
```

### Estructura de archivos de configuración

```
src/config/
├── app-config.service.ts      # Servicio tipado (acceso)
├── config.module.ts           # Módulo NestJS (exportación)
└── env/
    ├── env.types.ts           # Interface TypeScript (tipos)
    ├── env.schema.ts          # Schema Joi (validación runtime)
    └── environment.enum.ts    # Enum de entornos
```

**IMPORTANTE:** Mantén sincronizados la interface TypeScript y el schema Joi. Ambos deben reflejar las mismas variables.

## 🛡️ Seguridad

Esta plantilla incluye configuración de seguridad lista para producción con **Helmet** y **CORS** completamente configurables.

### Helmet - Headers de Seguridad

[Helmet](https://github.com/fastify/fastify-helmet) está integrado y activo en todos los entornos, agregando automáticamente headers de seguridad HTTP esenciales:

- **Content-Security-Policy** - Previene ataques XSS e inyecciones
- **X-Content-Type-Options** - Previene MIME sniffing
- **X-Frame-Options** - Previene clickjacking
- **Strict-Transport-Security** - Fuerza HTTPS
- **X-DNS-Prefetch-Control** - Controla DNS prefetching

**No requiere configuración** - Helmet usa valores seguros por defecto y se activa automáticamente al iniciar la aplicación.

### CORS - Cross-Origin Resource Sharing

[CORS](https://github.com/fastify/fastify-cors) está completamente configurado y personalizable mediante variables de entorno.

#### Variables de Entorno CORS

| Variable               | Descripción                              | Default                                |
| ---------------------- | ---------------------------------------- | -------------------------------------- |
| `CORS_ORIGIN`          | Orígenes permitidos (separados por coma) | `*` (todos los orígenes)               |
| `CORS_METHODS`         | Métodos HTTP permitidos                  | `GET,HEAD,PUT,PATCH,POST,DELETE`       |
| `CORS_ALLOWED_HEADERS` | Headers permitidos en requests           | `Content-Type,Authorization,Time-Zone` |
| `CORS_CREDENTIALS`     | Permitir envío de credentials/cookies    | `false`                                |

#### Ejemplos de Configuración CORS

**Desarrollo local con frontend:**

```env
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
```

**Producción con múltiples dominios:**

```env
CORS_ORIGIN=https://miapp.com,https://admin.miapp.com
CORS_CREDENTIALS=true
```

**API pública sin restricciones:**

```env
CORS_ORIGIN=*
CORS_CREDENTIALS=false
```

**Solo lectura (GET/HEAD):**

```env
CORS_ORIGIN=*
CORS_METHODS=GET,HEAD
CORS_CREDENTIALS=false
```

#### ⚠️ Validación de Seguridad

La aplicación **no arrancará** si detecta una configuración insegura:

```env
# ❌ Configuración inválida - La app no levantará
CORS_CREDENTIALS=true
CORS_ORIGIN=*
```

**Error mostrado:**

```
Invalid CORS configuration: credentials cannot be enabled with wildcard origin (*).
Set CORS_ORIGIN to specific origins or disable CORS_CREDENTIALS.
```

Esta validación previene un error común que los navegadores rechazan por razones de seguridad.

#### Verificar Headers de Seguridad

Puedes verificar que Helmet y CORS estén funcionando correctamente:

```bash
# Iniciar la aplicación
npm run start:dev

# En otra terminal, verificar headers
curl -I http://localhost:8000/api/health

# Deberías ver headers como:
# - content-security-policy: ...
# - x-content-type-options: nosniff
# - x-frame-options: SAMEORIGIN
# - access-control-allow-origin: *
```

#### Tests E2E de Seguridad

Esta plantilla incluye tests E2E completos que verifican:

- Headers de seguridad de Helmet (5 tests)
- Configuración CORS y preflight requests (6 tests)

Ubicación: `test/e2e/contexts/shared/`

```bash
npm run test:e2e
```

### Request Context - Language & TimeZone

Esta plantilla incluye un sistema de **Request Context** que captura automáticamente los headers `Accept-Language` y `Time-Zone` de cada request, haciéndolos disponibles en todos los controllers mediante decorators personalizados.

#### Decorators Disponibles

**`@GetLanguage()`** - Obtiene el idioma del request

- Captura el header `Accept-Language`
- Retorna `'en'` si contiene "en", sino retorna `'es'`
- Default: `'es'` (español)
- Type-safe con enum `Language`

**`@GetTimeZone()`** - Obtiene la zona horaria del request

- Captura el header `Time-Zone`
- Valida que sea un timezone IANA válido (ej: `America/Lima`, `UTC`, `Europe/Madrid`)
- Si es inválido, retorna `'UTC'` como fallback
- Default: `'UTC'`

#### Uso en Controllers

```typescript
import { Controller, Get } from '@nestjs/common';
import { GetLanguage, GetTimeZone } from 'src/contexts/shared/decorators';
import { Language } from 'src/contexts/shared/enums';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@GetLanguage() language: Language, @GetTimeZone() timezone: string) {
    // language: 'en' | 'es' (tipado con enum)
    // timezone: string (ej: 'America/Lima', 'UTC')

    // Usar para personalizar respuestas, formatear fechas, etc.
    return this.service.findAll(language, timezone);
  }
}
```

#### Ejemplos de Uso

**Internacionalización:**

```typescript
@Get('welcome')
getWelcome(@GetLanguage() language: Language) {
  const messages = {
    [Language.EN]: 'Welcome to our API',
    [Language.ES]: 'Bienvenido a nuestra API',
  };

  return { message: messages[language] };
}
```

**Formateo de fechas según timezone:**

```typescript
@Get('reports')
getReports(@GetTimeZone() timezone: string) {
  const data = await this.service.getReports();

  return data.map(item => ({
    ...item,
    date: this.formatDate(item.date, timezone),
  }));
}
```

#### Lógica de Headers

**Accept-Language:**

- `Accept-Language: en` → `'en'`
- `Accept-Language: en-US` → `'en'`
- `Accept-Language: es-ES` → `'es'`
- `Accept-Language: fr-FR` → `'es'` (cualquier cosa que no contenga "en")
- Sin header → `'es'` (default)

**Time-Zone:**

- `Time-Zone: America/Lima` → `'America/Lima'`
- `Time-Zone: UTC` → `'UTC'`
- `Time-Zone: Invalid/Zone` → `'UTC'` (fallback)
- Sin header → `'UTC'` (default)

#### Tests

La funcionalidad incluye tests completos:

- **Tests unitarios:** 31 tests (timezone validator + interceptor)
- **Tests E2E:** 20 tests (diferentes combinaciones de headers)

```bash
npm test           # Tests unitarios
npm run test:e2e   # Tests E2E
```

#### Implementación Técnica

- **Interceptor global:** Captura headers automáticamente en cada request
- **Validación de timezone:** Usa `Intl.DateTimeFormat` para validar timezones IANA
- **Type-safe:** Enum `Language` y tipos TypeScript estrictos
- **Sin overhead:** No usa request-scoped services

Para más detalles sobre la implementación, consulta:

- Interceptor: `src/contexts/shared/interceptors/request-context.interceptor.ts`
- Decorators: `src/contexts/shared/decorators/`
- Types: `src/contexts/shared/types/request-context.types.ts`

## 🎯 Siguientes Pasos

Esta plantilla es minimalista por diseño. Según las necesidades de tu proyecto, podrías querer agregar:

### Base de Datos

- **Prisma** - ORM moderno con excelente DX
- **TypeORM** - ORM maduro y completo
- **MikroORM** - ORM con enfoque en TypeScript

### Autenticación

- **Passport** - Estrategias de autenticación (JWT, OAuth, etc)
- **@nestjs/jwt** - Manejo de tokens JWT

### Validación

- **class-validator + class-transformer** - Validación basada en decoradores
- **Zod** - Validación con TypeScript-first approach

### API Documentation

- **@nestjs/swagger** - Documentación automática OpenAPI/Swagger

### Rate Limiting

- **@nestjs/throttler** - Protección contra abuso de API

### Caché

- **@nestjs/cache-manager** - Caché en memoria
- **ioredis** - Cliente Redis para caché distribuido

### Monitoring y Logging

- **Pino** - Logger de alto rendimiento (recomendado para Fastify)
- **Winston** - Logger flexible y extensible

### Otros

- **@nestjs/config** (ya incluido) - Manejo de configuración
- **@nestjs/terminus** (ya incluido) - Health checks avanzados
- **compression** - Compresión de respuestas

## 🔄 Posibles Mejoras Futuras

Esta plantilla está diseñada para ser un punto de partida sólido y production-ready. Sin embargo, dependiendo de tus necesidades específicas, podrías considerar agregar las siguientes mejoras:

### 🟢 Prioridad Alta (Recomendado para Producción)

#### 1. **Request ID Tracking**

Genera y rastrea un ID único para cada request, facilitando el debugging y trazabilidad en logs.

**Implementación sugerida:**

```typescript
// Interceptor que genera UUID para cada request
// Inyecta el ID en todos los logs automáticamente
// Retorna el ID en header X-Request-ID
```

**Beneficios:**

- ✅ Trazabilidad completa de requests en logs
- ✅ Debugging más eficiente en producción
- ✅ Correlación de requests en arquitecturas distribuidas

---

#### 2. **Graceful Shutdown**

Implementa un cierre limpio de la aplicación que espera a que los requests en curso terminen antes de cerrar.

**Implementación sugerida:**

```typescript
// main.ts
app.enableShutdownHooks();

// Manejo de señales SIGTERM/SIGINT
process.on('SIGTERM', async () => {
  await app.close();
});
```

**Beneficios:**

- ✅ Deployments sin downtime
- ✅ No se pierden requests en curso
- ✅ Cierre limpio de conexiones a bases de datos

---

#### 3. **Global Exception Filter**

Maneja todas las excepciones de forma consistente en un solo lugar.

**Implementación sugerida:**

```typescript
// src/contexts/shared/filters/global-exception.filter.ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Manejo consistente: log + respuesta estructurada
  }
}
```

**Beneficios:**

- ✅ Respuestas de error estandarizadas
- ✅ Logs estructurados de todas las excepciones
- ✅ Previene leaks de información sensible

---

### 🟡 Prioridad Media (Útil para BFF)

#### 4. **Compression Middleware**

Comprime las respuestas HTTP usando gzip/brotli para reducir el tamaño de la transferencia.

**Implementación:**

```bash
npm install @fastify/compress
```

```typescript
// main.ts
import fastifyCompress from '@fastify/compress';
await app.register(fastifyCompress, {
  encodings: ['gzip', 'deflate'],
});
```

**Beneficios:**

- ✅ Respuestas 50-70% más pequeñas
- ✅ Menor latencia para clientes
- ✅ Ahorro de bandwidth

---

#### 5. **Response Interceptor**

Transforma todas las respuestas a un formato consistente con metadata adicional.

**Implementación sugerida:**

```typescript
// Formato de respuesta:
{
  "data": { /* tu data */ },
  "meta": {
    "timestamp": "2026-02-09T10:00:00Z",
    "requestId": "uuid",
    "path": "/api/users"
  }
}
```

**Beneficios:**

- ✅ Estructura de respuesta predecible
- ✅ Metadata útil para debugging
- ✅ Mejor experiencia para frontend

---

#### 6. **API Versioning**

Permite mantener múltiples versiones de tu API simultáneamente.

**Implementación:**

```typescript
// main.ts
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});

// Controller
@Controller({ path: 'users', version: '1' })
export class UsersV1Controller {}

@Controller({ path: 'users', version: '2' })
export class UsersV2Controller {}
```

**Beneficios:**

- ✅ Evolución de API sin breaking changes
- ✅ Soporte de múltiples versiones de frontend
- ✅ Migración gradual de clientes

---

### 🔵 Prioridad Baja (Nice to Have)

#### 7. **Custom Metadata Decorators**

Crea decorators personalizados para roles, permisos, etc. Útil como preparación para autenticación futura.

**Implementación sugerida:**

```typescript
// decorators/roles.decorator.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Uso:
@Controller('admin')
export class AdminController {
  @Get()
  @Roles('admin')
  getAdminData() {}
}
```

**Beneficios:**

- ✅ Infraestructura lista para auth
- ✅ Código más declarativo
- ✅ Fácil de extender

---

### 📊 Tabla Comparativa de Mejoras

| Mejora                  | Prioridad | Complejidad | Impacto | Recomendado para |
| ----------------------- | --------- | ----------- | ------- | ---------------- |
| Request ID Tracking     | 🟢 Alta   | Baja        | Alto    | Producción       |
| Graceful Shutdown       | 🟢 Alta   | Baja        | Alto    | Producción       |
| Global Exception Filter | 🟢 Alta   | Media       | Alto    | Producción       |
| Compression             | 🟡 Media  | Baja        | Medio   | BFF              |
| Response Interceptor    | 🟡 Media  | Baja        | Medio   | BFF              |
| API Versioning          | 🟡 Media  | Media       | Medio   | APIs públicas    |
| Custom Decorators       | 🔵 Baja   | Baja        | Bajo    | Preparación auth |

---

### 💡 Nota Importante

**Esta plantilla deliberadamente NO incluye:**

- ❌ Bases de datos (Prisma, TypeORM, etc.) - Elección del usuario
- ❌ Autenticación (Passport, JWT, etc.) - Varía por proyecto
- ❌ Validación de DTOs (class-validator, Zod) - Preferencia del usuario
- ❌ Rate limiting - Específico por caso de uso
- ❌ Swagger/OpenAPI - Opcional según necesidades

Estas decisiones son **intencionales** para mantener la plantilla minimalista y flexible. Agrega solo lo que necesites según tu proyecto específico.

---

## 🙏 Agradecimientos

Esta plantilla está basada en el excelente [repositorio de Albert Hernández](https://github.com/AlbertHernandez/nestjs-service-template). He realizado modificaciones y actualizaciones para adaptarla a:

- NestJS 11
- Node 24
- ESLint 9 (flat config)
- TypeScript strict mode
- Mis preferencias de desarrollo

¡Gracias a Albert Hernández por crear una base sólida!

## 📄 Licencia

MIT

---

<p align="center">Hecho con ❤️ para acelerar el desarrollo con NestJS</p>
