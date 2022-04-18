import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('DATA: ', data); // the argument given from wherever it's used, stored within the data e.ge 'https'
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.protocol;
  },
);
