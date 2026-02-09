import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { Language } from 'src/contexts/shared/enums/language.enum';
import { RequestContextInterceptor } from 'src/contexts/shared/interceptors/request-context.interceptor';
import { RequestWithContext } from 'src/contexts/shared/types/request-context.types';

describe('RequestContextInterceptor', () => {
  let interceptor: RequestContextInterceptor;
  let callHandler: CallHandler;

  beforeEach(() => {
    interceptor = new RequestContextInterceptor();
    callHandler = {
      handle: jest.fn(() => of({})),
    };
  });

  const createMockExecutionContext = (
    mockRequest: Partial<RequestWithContext>,
  ): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    } as ExecutionContext;
  };

  describe('Language Extraction', () => {
    it('debería extraer language "en" cuando Accept-Language contiene "en"', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'en-US' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.EN);
    });

    it('debería extraer language "en" cuando Accept-Language es "EN" (uppercase)', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'EN' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.EN);
    });

    it('debería extraer language "en" cuando Accept-Language es "en"', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'en' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.EN);
    });

    it('debería extraer language "es" cuando Accept-Language no contiene "en"', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'es-ES' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.ES);
    });

    it('debería extraer language "es" cuando Accept-Language es francés', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'fr-FR' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.ES);
    });

    it('debería usar "es" por defecto cuando no hay Accept-Language header', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: {},
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.ES);
    });

    it('debería extraer language "es" cuando Accept-Language es cualquier string sin "en"', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'accept-language': 'pt-BR' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.ES);
    });
  });

  describe('TimeZone Extraction', () => {
    it('debería extraer timezone "America/Lima" cuando es válido', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'time-zone': 'America/Lima' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('America/Lima');
    });

    it('debería extraer timezone "UTC" cuando es válido', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'time-zone': 'UTC' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('UTC');
    });

    it('debería extraer timezone "Europe/Madrid" cuando es válido', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'time-zone': 'Europe/Madrid' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('Europe/Madrid');
    });

    it('debería usar "UTC" cuando timezone es inválido', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'time-zone': 'Invalid/Zone' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('UTC');
    });

    it('debería usar "UTC" cuando no hay Time-Zone header', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: {},
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('UTC');
    });

    it('debería hacer trim del timezone', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: { 'time-zone': '  America/Lima  ' },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.timezone).toBe('America/Lima');
    });
  });

  describe('Ambos Headers', () => {
    it('debería extraer ambos valores correctamente', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: {
          'accept-language': 'en-US',
          'time-zone': 'America/Lima',
        },
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.EN);
      expect(mockRequest.context?.timezone).toBe('America/Lima');
    });

    it('debería usar defaults cuando no hay headers', () => {
      const mockRequest: Partial<RequestWithContext> = {
        headers: {},
        context: undefined,
      };
      const executionContext = createMockExecutionContext(mockRequest);

      interceptor.intercept(executionContext, callHandler);

      expect(mockRequest.context?.language).toBe(Language.ES);
      expect(mockRequest.context?.timezone).toBe('UTC');
    });
  });
});
