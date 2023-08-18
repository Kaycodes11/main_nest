// TODO: decorator can modify class, property, accessor, method and parameter

// [SCOPE]: class, method/handler, parameter, property, accessor

import { createParamDecorator, ExecutionContext, applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

// so
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // get access to the current request then do whatever needed with it  + same thing with data
  const request = ctx.switchToHttp().getRequest();
  // const next = ctx.switchToHttp().getNext(); // if needed to send to next decorator

  // return value could be either as below or like return value of @User2()

  return request.user;
});

// make a parameterized decorator
export const User2 = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});

/*
path : src / users / user.controller.ts

@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

-- once again, here @User decorator's first argument could be literally any datatype
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true })) user: UserEntity) {
    console.log(user);
}

@Get()
async findOne(@User2('firstName') firstName: string) {
  // to access just firstName's value do it like this otherwise @User2()
  console.log(firstName);
}


*/

// ## decorator composition helps to combine "multiple decorators" into a "single decorator" like below

const roles = ['Manager', 'Interviewee', 'Interviewer', 'HR'];

/*

[path]: shared / decorators / auth.decorator.ts

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

[ path ]: src / auth / auth.controller.ts

@Get('users')
@Auth('admin')
async findAllUsers() {}


*/
