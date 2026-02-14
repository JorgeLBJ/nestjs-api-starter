import { FastifyRequest } from 'fastify';

import { Language } from '../enums/language.enum';

export interface RequestContext {
  language: Language;
  timezone: string;
  requestId: string;
}

export interface RequestWithContext extends FastifyRequest {
  context?: RequestContext;
}
