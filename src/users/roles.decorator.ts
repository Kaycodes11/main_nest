import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';

// enum RoleEnum {
//   DEVELOPER,
//   HR,
//   INTERVIEWEE,
//   INTERVIEWER,
//   MANAGER,
//   USER,
// }

// const rolesMap = {
//   [RoleEnum.HR]: 'hr',
//   [RoleEnum.INTERVIEWER]: 'interviewer',
// } as const;

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

// const list: RoleLevel[] = [ROLES_LEVEL.DEVELOPER, ROLES_LEVEL.HR];

// https://www.youtube.com/watch?v=jjMbPt_H3RQ&t=357s&ab_channel=MattPocock

export const Roles = (...args: RoleLevel[]) => SetMetadata(ROLE_KEY, args);
