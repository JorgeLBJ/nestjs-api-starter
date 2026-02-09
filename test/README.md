# 🧪 Estructura de Tests

Este proyecto utiliza una arquitectura de tests separada del código de producción, manteniendo una estructura espejo del directorio `src/`.

## 📁 Estructura de Carpetas

```
test/
├── unit/                          # Tests unitarios (espejo de src/)
│   ├── config/                    # Tests de configuración
│   │   └── app-config.service.spec.ts
│   └── contexts/                  # Tests de contexts
│       └── health/
│           └── controllers/
│               └── health.controller.spec.ts
│
└── e2e/                           # Tests e2e (espejo de src/)
    └── contexts/
        └── health/
            └── health.e2e-spec.ts
```

## 🎯 Principios de Diseño

### Separación de Responsabilidades

- **Tests unitarios**: Prueban funciones/métodos individuales en aislamiento
- **Tests e2e**: Prueban flujos completos integrando múltiples módulos

### Estructura Espejo

Los tests mantienen la misma estructura que el código en `src/`:

- Si el código está en `src/config/app-config.service.ts`
- El test está en `test/unit/config/app-config.service.spec.ts`

Esto facilita:

- Encontrar el test correspondiente a cada archivo
- Mantener coherencia en la organización del código
- Escalar el proyecto sin perder claridad

## 🔧 Imports de Módulos

Todos los tests usan **imports absolutos con el alias `src/`**:

```typescript
// ✅ Correcto - Import absoluto con alias
import { AppConfigService } from 'src/config/app-config.service';
import { HealthController } from 'src/contexts/health/controllers/health.controller';

// ❌ Incorrecto - Import relativo largo
import { AppConfigService } from '../../../src/config/app-config.service';
```

### Configuración

Este patrón es posible gracias a:

1. **tsconfig.json** - Configura los paths de TypeScript:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "src/*": ["./src/*"]
    }
  }
}
```

2. **package.json** - Configura Jest para resolver los paths:

```json
{
  "jest": {
    "moduleNameMapper": {
      "^src/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

3. **test/jest-e2e.json** - Configura Jest e2e (con ajuste de path):

```json
{
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
}
```

## 🚀 Comandos de Tests

### Tests Unitarios

```bash
npm test              # Ejecutar todos los tests unitarios
npm run test:watch    # Ejecutar tests en modo watch
npm run test:cov      # Ejecutar tests con coverage
```

### Tests E2E

```bash
npm run test:e2e      # Ejecutar todos los tests e2e
```

## 📝 Convenciones de Nombres

- **Tests unitarios**: `[nombre].spec.ts`
- **Tests e2e**: `[nombre].e2e-spec.ts`
- **Ubicación**: Deben reflejar exactamente la estructura de `src/`

## 📋 Agregar Nuevos Tests

### Test Unitario

1. Crear el archivo en la ubicación espejada:

```bash
test/unit/contexts/users/services/users.service.spec.ts
```

2. Importar usando alias `src/`:

```typescript
import { UsersService } from 'src/contexts/users/services/users.service';
```

### Test E2E

1. Crear el archivo en la ubicación espejada:

```bash
test/e2e/contexts/users/users.e2e-spec.ts
```

2. Importar usando alias `src/`:

```typescript
import { UsersModule } from 'src/contexts/users/users.module';
```

## 🎯 Mejores Prácticas

1. **Aislamiento**: Cada test debe ser independiente y no depender del orden de ejecución
2. **Descriptividad**: Usa `describe()` e `it()` con nombres claros en español
3. **Mocks**: Usa `jest.fn()` y `jest.spyOn()` para aislar dependencias
4. **AAA Pattern**: Arrange, Act, Assert en cada test
5. **Coverage**: Mantén coverage alto en código crítico

## 📖 Referencias

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
