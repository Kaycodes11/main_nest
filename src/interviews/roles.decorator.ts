import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';

export const ROLES_LEVEL = {
  HR: 'hr',
  DEVELOPER: 'developer',
  INTERVIEWER: 'interviewer',
  INTERVIEWEE: 'interviewee',
  MANAGER: 'manger',
  USER: 'user',
} as const;

type ObjectiveValues<T> = T[keyof T];

export type RoleLevel = ObjectiveValues<typeof ROLES_LEVEL>;

export const Roles = (...args: RoleLevel[]) => SetMetadata(ROLE_KEY, args);
