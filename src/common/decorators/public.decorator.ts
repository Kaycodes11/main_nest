import { SetMetadata } from '@nestjs/common';

export const IS_IT_PUBLIC_KEY = 'isPublic';

// export const Public = () => SetMetadata(IS_IT_PUBLIC_KEY, true);

export const Public = (...args: string[]) =>
  SetMetadata(IS_IT_PUBLIC_KEY, args);
