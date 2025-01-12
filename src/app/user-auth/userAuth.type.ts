import type { UserType } from "@/types";

export type UserAuthModeType = "login" | "register";

export type UserLoginResponseType = {
  message: string;
  user: UserType;
};
