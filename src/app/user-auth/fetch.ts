import { logError } from "@/utils";
import { UserLoginResponseType } from "./userAuth.type";

export const loginFetcher = async (email: string, password: string) => {
  if (!email || !password) return;
  try {
    const data = await fetch(
      "https://card-games-backend.vercel.app/user/login",

      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const userLoginResponse: UserLoginResponseType = await data.json();
    return userLoginResponse;
  } catch (err) {
    logError(`User login call failed: ${err}`);
    Promise.reject(err);
  }
};

export const registerFetcher = async (
  email: string,
  username: string,
  password: string
) => {
  if (!email || !username || !password) return;
  try {
    const data = await fetch(
      "https://card-games-backend.vercel.app/user/register",

      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      }
    );
    const userRegisterResponse: UserLoginResponseType = await data.json();
    return userRegisterResponse;
  } catch (err) {
    logError(`User register call failed: ${err}`);
    Promise.reject(err);
  }
};
