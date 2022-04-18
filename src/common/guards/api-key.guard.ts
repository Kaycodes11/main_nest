import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_IT_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // to access route's metadate need to use this Reflectror class
  constructor(
    private readonly reflect: Reflector,
    private readonly config: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflect.get(IS_IT_PUBLIC_KEY, context.getHandler()); // which key, which method/handler?
    if (isPublic) {
      // since it's isPublic, then skip checking the token from request header by retrung true value
      return true;
    }
    // othwerwise, take the request object and its header to verify api key within it
    const request = context.switchToHttp().getRequest<Request>();
    // now get the auth token from the request object
    const authHeader = request.header('Authorization');
    return authHeader === this.config.get('API_KEY');
  }
}
