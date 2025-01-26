import type { UserType } from '@/types';

export type UserAuthModeType = 'login' | 'register';

export type UserResponseType = {
  message: string;
  user: UserType;
};
