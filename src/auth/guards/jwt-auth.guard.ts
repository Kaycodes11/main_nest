import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// most likely this AuthGuard('jwt') has some global config which is why it doesn't need to be imported in any module to use it like @UseGuards(JwtAuthGuard)

/*

// ## if using @IsPublic() decorator then use below

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) return true;

    // otherwise just invoke the original value as below
    return super.canActivate(context);
    
  }
}

## to use this JwtAuthGuard on all endpoints on any module; just do this in any module (e.g. AuthModule)

@Module({
    providers: [{provide: APP_GUARD, useClass: JwtAuthGuard}]
    exports: ["no need to export it"]
})




*/