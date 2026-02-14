import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

import { Language } from '../enums/language.enum';
import { RequestWithContext } from '../types/request-context.types';
import { normalizeTimeZone } from '../utils/timezone-validator.util';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithContext>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    const requestId = this.cls.getId();

    // Set the x-request-id header in the response
    if (requestId) {
      void response.header('x-request-id', requestId);
    }

    const acceptLanguage =
      (request.headers['accept-language'] as string)?.toLowerCase() || '';
    const language = acceptLanguage.includes('en') ? Language.EN : Language.ES;

    const timezoneHeader = request.headers['time-zone'] as string | undefined;
    const timezone = normalizeTimeZone(timezoneHeader);

    request.context = {
      language,
      timezone,
      requestId: requestId || '',
    };

    return next.handle();
  }
}
