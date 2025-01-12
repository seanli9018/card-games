"use client";

import { useReducer } from "react";
import { UserContext } from "./userContext";
import { getStorage, setStorage, removeStorage } from "@/utils";
import type {
  UserProviderProps,
  UserStateType,
  UserStateActionType,
} from "./user.type";
import {
  UPDATE_USER,
  LOGOUT_USER,
  USER_STATE_STORAGE_KEY,
  USER_STATE_STORAGE_EXPIRE_IN_MIN,
} from "./constants";

// initial state
const initialStateGenerator = (): UserStateType => {
  const userStateLocalStorage = getStorage(USER_STATE_STORAGE_KEY);
  if (!userStateLocalStorage) {
    return {
      user: null,
      isLoggedIn: false,
    };
  }

  return JSON.parse(userStateLocalStorage);
};

// Define the reducer function
const userReducer = (state: UserStateType, action: UserStateActionType) => {
  switch (action.type) {
    case UPDATE_USER: {
      if (!action.payload) return state;

      const updatedState = {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
      };

      setStorage(
        USER_STATE_STORAGE_KEY,
        JSON.stringify(updatedState),
        USER_STATE_STORAGE_EXPIRE_IN_MIN
      );

      return updatedState;
    }

    case LOGOUT_USER:
      if (!!getStorage(USER_STATE_STORAGE_KEY))
        removeStorage(USER_STATE_STORAGE_KEY);

      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialStateGenerator());

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
