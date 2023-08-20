## Authorization: https://docs.nestjs.com/security/authorization

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }

// 1. just do this within any module and by default "it will apply to all routes" -> which is a problem
// 2. since we don't want it to apply each and every routes ; thus use a public decorator

// The @Public decorator simply

// [path]:  src/ auth / auth.module.ts

-- once, by doing this it will be apply to all routes so no need to export RolesGuard

providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],

@Controller
export class JobsController {

  @UseGuards('No need to do it since RolesGuard will apply to all routes by default')
  @IsPublic(ROLES_LEVEL.PUBLIC)
  async fetchJobs() {}
}

## then just within RolesGuard; first, check if (requiredRoles === ROLES.LEVEL.PUBLIC) return true

## since it applies to all routes by default 




```
