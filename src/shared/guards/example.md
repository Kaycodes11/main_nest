## Whether an incoming request should go to its route handler or not

## [SCOPE]: controller, controller's method / route handler, global (main.ts)

## [NOTE]: Guard is executed after all middleware and before any interceptor or pipe

```ts

#### only go to its route handler when the request has sufficient permissions

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

[ path ] : src / shared / guards / auth.guard.ts

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request); // true then proceed to its route handler else deny the request totally
  }
}

[ path ] : src / shared / guards / roles.guard.ts


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get the metadata from wherever (controller / method) its applied by doing it as below
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    /*

    When a user with insufficient privileges requests an endpoint, Nest automatically returns the following response: so it basically throws a ForbiddenException 

    result = {
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
        }
    
    */
    return matchRoles(roles, user.roles); // this method will do anything then return boolean

  }
}

[ path ] : src / cats / cats.controller.ts

@Post()
// 1. SetMetadata adds custom metadata on this method so when guard applied to this method as below;
// 2. it will have access to this metadata "then using that it can determine whether to allow access or not"
@SetMetadata('roles', ['admin']) // key, value
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // this is now a decorator so

@Post()
@Roles('admin') // once again this metadata will be accessible within the guard
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

```
