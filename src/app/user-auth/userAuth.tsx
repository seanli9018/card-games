"use client";

import { isValidElement, useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@/components";
import { LoginInputProps, UserAuthModeType } from "./userAuth.type";

function LoginInput({
  leadingIcon,
  inputProps,
  error,
  resetValue,
  onChangeCommit,
  ...restProps
}: LoginInputProps) {
  const [inputValue, setInputValue] = useState("");

  const inputContainerStyles = clsx(restProps.className);
  const inputStyles = clsx(
    `block min-w-0 grow py-1.5 pl-2 pr-3 text-base bg-slate-300 dark:bg-slate-800 
            placeholder:dark:text-gray-400 placeholder:text-gray-800 focus:outline focus:outline-0 sm:text-sm/6`,
    inputProps?.className
  );

  const inputLeadingIcon = isValidElement(leadingIcon) ? leadingIcon : null;

  const handleChangeCommit = () => {
    if (!inputValue.trim()) return;
    if (onChangeCommit) onChangeCommit(inputValue.trim());
  };

  const handleInputKeydown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter" || evt.code === "Enter") {
      handleChangeCommit();
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  useEffect(() => {
    if (!resetValue) return;

    setInputValue("");
  }, [resetValue]);

  return (
    <div {...restProps} className={inputContainerStyles}>
      <div
        className="flex items-center rounded-md bg-slate-300 dark:bg-slate-800 pl-3 
        outline outline-1 -outline-offset-1 outline-slate-600 has-[input:focus-within]:outline has-[input:focus-within]:outline-1 
        has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-slate-400"
      >
        {inputLeadingIcon}
        <input
          type="text"
          {...inputProps}
          className={inputStyles}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
      </div>
      {error ? (
        <span className="text-xs mt-1 text-red-600 dark:text-red-200">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default function UserAuth() {
  const [mode, setMode] = useState<UserAuthModeType>("login");

  useEffect(() => {
    setMode("login");
  }, []);

  return (
    <section className="flex flex-col justify-center gap-8 flex-1 max-w-lg w-full mx-auto px-4 md:px-6">
      <h1 className="text-lg md:text-xl font-semibold text-center">
        YC Card Game {mode === "login" ? "Login" : "Register"}
      </h1>
      <LoginInput
        inputProps={{ type: "text", placeholder: "Email" }}
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
      />
      {mode !== "login" ? (
        <LoginInput
          inputProps={{ type: "text", placeholder: "Username" }}
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
        />
      ) : null}
      <LoginInput
        inputProps={{ type: "password", placeholder: "Password" }}
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
      />
      <Button variant="primary" widthType="layout">
        Log in
      </Button>
      <span className="text-sm text-center text-slate-400">
        New user?{" "}
        <a href="#" className="underline underline-offset-2">
          Register
        </a>
      </span>
      <span className="text-sm text-center -mt-6 text-slate-400">
        Forgot password?{" "}
        <a href="#" className="underline underline-offset-2">
          Reset password
        </a>
      </span>
    </section>
  );
}
