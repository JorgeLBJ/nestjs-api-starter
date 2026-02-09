import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Language } from '../enums/language.enum';
import { RequestWithContext } from '../types/request-context.types';

export const GetLanguage = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Language => {
    const request = ctx.switchToHttp().getRequest<RequestWithContext>();
    return request.context?.language ?? Language.ES;
  },
);
