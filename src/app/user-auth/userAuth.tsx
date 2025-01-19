"use client";

import { useState, useEffect, useRef, type MouseEventHandler } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Input,
  NotificationHub,
  Spinner,
  type AddNotificationCBFunction,
} from "@/components";
import { useUser, UPDATE_USER, LOGOUT_USER } from "@/store/user";
import { loginFetcher, registerFetcher } from "./fetch";
import { logError } from "@/utils";
import LogoThumbnail from "../../../public/logo_thumbnail.jpg";
import { UserAuthModeType } from "./userAuth.type";

export default function UserAuth({ mode }: { mode: UserAuthModeType }) {
  const [errors, setErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const [authPayload, setAuthPayload] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loginTrigger, setLoginTrigger] = useState(false);
  const [registerTrigger, setRegisterTrigger] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the redirect URL from query
  const redirect = searchParams.get("redirect");

  const { dispatch } = useUser();

  const isLoginMode = mode === "login";

  const addNotificationRef = useRef<AddNotificationCBFunction | null>(null);

  const {
    data: userLoginResponse,
    error: userLoginError,
    isLoading: userLoginLoading,
  } = useQuery({
    queryKey: ["login"],
    queryFn: () => loginFetcher(authPayload.email, authPayload.password),
    enabled: loginTrigger,
    staleTime: 0,
  });

  const {
    data: userRegisterResponse,
    error: userRegisterError,
    isLoading: userRegisterLoading,
  } = useQuery({
    queryKey: ["register"],
    queryFn: () =>
      registerFetcher(
        authPayload.email,
        authPayload.username,
        authPayload.password
      ),
    enabled: registerTrigger,
    staleTime: 0,
  });

  const emailInputValidator = (value: string) => {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    const isValidEmail = emailRegExp.test(value);

    if (isValidEmail) {
      setErrors((prevErr) => ({
        ...prevErr,
        emailError: "",
      }));
      return true;
    }

    if (!isValidEmail) {
      setErrors((prevErr) => ({
        ...prevErr,
        emailError: "Please enter a valid email address.",
      }));
      return false;
    }
  };

  const usernameInputValidator = (value: string) => {
    const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/;
    const isValidUsername = usernameRegExp.test(value);

    if (isValidUsername) {
      setErrors((prevErr) => ({
        ...prevErr,
        usernameError: "",
      }));
      return true;
    }
    if (!isValidUsername) {
      setErrors((prevErr) => ({
        ...prevErr,
        usernameError: "Invalid username",
      }));
      return false;
    }
  };

  const passwordInputValidator = (value: string) => {
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/;
    const isValidPassword = passwordRegExp.test(value);

    if (isValidPassword) {
      setErrors((prevErr) => ({
        ...prevErr,
        passwordError: "",
      }));
      return true;
    }

    if (!isValidPassword) {
      setErrors((prevErr) => ({
        ...prevErr,
        passwordError: "Invalid password",
      }));
      return false;
    }
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    switch (evt.target.id) {
      case "email": {
        const isValidEmail = emailInputValidator(evt.target.value);
        if (isValidEmail)
          setAuthPayload((prevPayload) => ({
            ...prevPayload,
            email: evt.target.value,
          }));
        return;
      }

      case "username": {
        const isValidUsername = usernameInputValidator(evt.target.value);
        if (isValidUsername)
          setAuthPayload((prevPayload) => ({
            ...prevPayload,
            username: evt.target.value,
          }));
        return;
      }

      case "password": {
        const isValidPassword = passwordInputValidator(evt.target.value);
        if (isValidPassword)
          setAuthPayload((prevPayload) => ({
            ...prevPayload,
            password: evt.target.value,
          }));
        return;
      }
    }
  };

  const handlePasswordToggle = () => {
    setRevealPassword((prevValue) => !prevValue);
  };

  const handleAuthBtnClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    const { email, username, password } = authPayload;
    const { emailError, usernameError, passwordError } = errors;

    // Log in
    if (isLoginMode) {
      if (emailError || passwordError || !email || !password) {
        addNotificationRef.current?.({
          title: "Warning",
          message: "Please enter valid email and password to proceed.",
          imageSrc: LogoThumbnail,
        });
        return;
      }

      // fire user login call.
      setLoginTrigger(true);
    }

    // Register
    if (!isLoginMode) {
      if (
        emailError ||
        passwordError ||
        usernameError ||
        !email ||
        !password ||
        !username
      ) {
        addNotificationRef.current?.({
          title: "Warning",
          message:
            "Please enter valid email, username and password to proceed.",
          imageSrc: LogoThumbnail,
        });
        return;
      }

      // fire user register call.
      setRegisterTrigger(true);
    }
  };

  // Login data, error status handling.
  useEffect(() => {
    if (userLoginLoading || !loginTrigger) return;
    //Reset trigger.
    setLoginTrigger(false);

    if (userLoginError) {
      addNotificationRef.current?.({
        title: "Error",
        message: "Failed to log in. Please try again later.",
        imageSrc: LogoThumbnail,
      });
      // logout user and remove all user data in localStorage if there is any.
      dispatch({ type: LOGOUT_USER });
      logError(`User authentication call failed: ${userLoginError}`);
      return;
    }

    if (!userLoginError && userLoginResponse && !userLoginResponse.user) {
      addNotificationRef.current?.({
        title: "Error",
        message:
          userLoginResponse?.message ??
          "Failed to log in. Please try again later.",
        imageSrc: LogoThumbnail,
      });
      // logout user and remove all user data in localStorage if there is any.
      dispatch({ type: LOGOUT_USER });
      logError("User authentication call succeed without returning user data.");
      return;
    }

    if (userLoginResponse?.user) {
      dispatch({ type: UPDATE_USER, payload: userLoginResponse.user });

      // Ensure `redirect` is a string before using it
      const redirectTo = Array.isArray(redirect) ? redirect[0] : redirect;
      // redirect to previous page or home page after login process.
      router.replace(redirectTo || "/");
    }
  }, [
    userLoginError,
    userLoginResponse,
    userLoginLoading,
    loginTrigger,
    setLoginTrigger,
    dispatch,
    router,
    redirect,
  ]);

  // Register data, error status handling.
  useEffect(() => {
    if (userRegisterLoading || !registerTrigger) return;
    //Reset trigger.
    setRegisterTrigger(false);

    if (userRegisterError) {
      addNotificationRef.current?.({
        title: "Error",
        message:
          userRegisterResponse?.message ??
          "Failed to register new user. Please try again later.",
        imageSrc: LogoThumbnail,
      });
      // logout user and remove all user data in localStorage if there is any.
      dispatch({ type: LOGOUT_USER });
      logError(`User authentication failed: ${userRegisterError}`);
      return;
    }

    if (
      !userRegisterError &&
      userRegisterResponse &&
      !userRegisterResponse.user
    ) {
      // logout user and remove all user data in localStorage if there is any.
      addNotificationRef.current?.({
        title: "Error",
        message:
          userRegisterResponse?.message ??
          "Failed to register new user. Please try again later.",
        imageSrc: LogoThumbnail,
      });
      // logout user and remove all user data in localStorage if there is any.
      dispatch({ type: LOGOUT_USER });
      logError(userRegisterResponse?.message);
      return;
    }

    if (userRegisterResponse?.user) {
      dispatch({ type: UPDATE_USER, payload: userRegisterResponse.user });

      // Ensure `redirect` is a string before using it
      const redirectTo = Array.isArray(redirect) ? redirect[0] : redirect;
      // redirect to previous page or home page after login process.
      router.replace(redirectTo || "/");
    }
  }, [
    userRegisterError,
    userRegisterResponse,
    userRegisterLoading,
    registerTrigger,
    setRegisterTrigger,
    dispatch,
    router,
    redirect,
  ]);

  return (
    <>
      <section className="flex flex-col justify-center gap-8 flex-1 max-w-lg w-full mx-auto px-4 md:px-6">
        <h1 className="text-lg md:text-xl font-semibold text-center">
          YC Card Game {isLoginMode ? "Login" : "Register"}
        </h1>
        <Input
          inputProps={{ type: "text", placeholder: "Email", id: "email" }}
          leadingIcon={
            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
          }
          onBlur={handleBlur}
          error={errors.emailError}
        />
        {!isLoginMode ? (
          <Input
            inputProps={{
              type: "text",
              placeholder: "Username",
              id: "username",
            }}
            leadingIcon={
              <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
            }
            // Username must be at least 3 characters, starts with letters.
            onBlur={handleBlur}
            error={
              errors.usernameError ? (
                <ul className="text-xs mt-1 text-red-600 dark:text-red-200">
                  <li>Please enter a valid username, which requires: </li>
                  <li> - At least 3 characters in length</li>
                  <li> - Starts with letter</li>
                  <li> - Only letters, numbers and _ are allowed.</li>
                  <li>
                    - The underscore _ character must not appear at the end.
                  </li>
                </ul>
              ) : undefined
            }
          />
        ) : null}
        <Input
          inputProps={{
            type: !revealPassword ? "password" : "text",
            placeholder: "Password",
            id: "password",
          }}
          onBlur={handleBlur}
          error={
            errors.passwordError ? (
              <ul className="text-xs mt-1 text-red-600 dark:text-red-200">
                <li>Please enter a valid password, which requires: </li>
                <li> - 5 to 16 in length</li>
                <li> - At least one letter and one number.</li>
              </ul>
            ) : undefined
          }
          leadingIcon={
            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
          }
          trailingIcon={
            <div
              className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6 cursor-pointer"
              onClick={handlePasswordToggle}
            >
              {revealPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          }
        />
        <Button
          variant="primary"
          widthType="layout"
          className="min-h-10"
          onClick={handleAuthBtnClick}
          disabled={userLoginLoading || userRegisterLoading}
        >
          {userLoginLoading || userRegisterLoading ? (
            <Spinner />
          ) : isLoginMode ? (
            "Log in"
          ) : (
            "Register"
          )}
        </Button>
        {isLoginMode ? (
          <span className="text-sm text-center text-slate-400">
            New user?{" "}
            <Link
              href="/user-auth/register"
              className="underline underline-offset-2"
            >
              Register
            </Link>
          </span>
        ) : (
          <span className="text-sm text-center text-slate-400">
            Already registered?{" "}
            <Link
              href="/user-auth/login"
              className="underline underline-offset-2"
            >
              Log in
            </Link>
          </span>
        )}
        {isLoginMode ? (
          <span className="text-sm text-center -mt-6 text-slate-400">
            Forgot password?{" "}
            <a href="#" className="underline underline-offset-2">
              Reset password
            </a>
          </span>
        ) : null}
      </section>
      <NotificationHub
        timeout={5000}
        variant={userLoginError || userRegisterError ? "error" : "warn"}
        addNotification={(addNotificationCB: AddNotificationCBFunction) => {
          addNotificationRef.current = addNotificationCB;
        }}
      />
    </>
  );
}
