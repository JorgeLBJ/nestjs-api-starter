import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import unicornPlugin from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  // Ignorar archivos
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.js',
      '*.mjs',
      '!eslint.config.mjs',
    ],
  },

  // Configuración base de ESLint
  eslint.configs.recommended,

  // Configuración para archivos TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Reglas de TypeScript
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Reglas de importación
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            // Side effect imports
            ['^\\u0000'],
            // node: protocol imports
            ['^node:'],
            // Packages (external libraries)
            ['^@?\\w'],
            // Internal packages
            ['^(src/)'],
            // Relative imports
            ['^'],
            // Parent imports (../)
            ['^\\.\\./'],
            // Same folder imports (./)
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Reglas de Unicorn (con overrides)
      ...unicornPlugin.configs.recommended.rules,
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',

      // Reglas generales
      'no-console': 'warn',
      'no-process-exit': 'off',

      // Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
    },
  },

  // Configuración para archivos de scripts
  {
    files: ['scripts/**/*.ts', 'scripts/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },

  // Configuración para archivos de tests
  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  },

  // Configuración para archivos de tests de performance
  {
    files: ['tests/performance/**/*.ts'],
    rules: {
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // Prettier debe ser el último para sobrescribir reglas de formateo
  prettierConfig,
];
