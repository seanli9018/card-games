export type UserAuthModeType = "login" | "register";

export type UserLoginResponseType = {
  message: string;
  user: {
    username: string;
    email: string;
    role: string;
    profile_picture: string;
  };
};
