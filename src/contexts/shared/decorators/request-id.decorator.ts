import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithContext } from '../types/request-context.types';

export const GetRequestId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<RequestWithContext>();
    return request.context?.requestId || '';
  },
);
