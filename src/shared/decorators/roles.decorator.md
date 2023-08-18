```ts
import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLES_KEY = 'roles';

// this is a function that returns a decorator
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```
