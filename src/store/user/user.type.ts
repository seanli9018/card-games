import type { ReactNode, Dispatch } from 'react';
import type { UserType } from '@/types';
import { UPDATE_USER, LOGOUT_USER } from './constants';

export interface UserProviderProps {
  children: ReactNode;
}

export type UserStateType = {
  user?: UserType;
  isLoggedIn: boolean;
};

export type UserStateActionTypeUnion = typeof UPDATE_USER | typeof LOGOUT_USER;
export type UserStateActionType = {
  type: UserStateActionTypeUnion;
  payload?: UserType;
};

export type UserContextType = UserStateType & {
  dispatch: Dispatch<UserStateActionType>;
};
