import type { AxiosError } from "axios";
import { axiosInstance } from "@/utils";
import { logError } from "@/utils";
import { UserResponseType } from "./userAuth.type";

export const loginFetcher = async (email: string, password: string) => {
  if (!email || !password) return;
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    const userLoginResponse: UserResponseType = await response.data;
    return userLoginResponse;
  } catch (err: unknown) {
    logError(`User login call failed: ${err}`);
    throw new Error("Error log in user: " + (err as AxiosError).message);
  }
};

export const registerFetcher = async (
  email: string,
  username: string,
  password: string
) => {
  if (!email || !username || !password) return;
  try {
    const response = await axiosInstance.post("/user/create", {
      email,
      username,
      password,
    });

    const userRegisterResponse: UserResponseType = await response.data;
    return userRegisterResponse;
  } catch (err: unknown) {
    logError(`User register call failed: ${err}`);
    throw new Error("Error register user: " + (err as AxiosError).message);
  }
};
