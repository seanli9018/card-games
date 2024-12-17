"use client";
import clsx from "clsx";
import { ButtonProps } from "./button.type";

export default function Button({
  children,
  variant = "primary",
  shape = "rectangle",
  size = "regular",
  widthType = "content",
  ...restProps
}: ButtonProps) {
  if (!children) return;

  const buttonStyles = clsx(
    {
      "bg-sky-600/75 text-white hover:bg-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-opacity-75":
        variant === "primary",
      "bg-transparent hover:bg-sky-400/25 text-sky-600  hover:text-sky-400 border border-sky-600 hover:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-opacity-75":
        variant === "secondary",
      "bg-transparent hover:bg-sky-400/25 text-sky-600  hover:text-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:ring-opacity-75":
        variant === "tertiary",
    },
    { rounded: shape === "rectangle", "rounded-full": shape === "round" },
    {
      "text-sm py-1 px-4": size === "small",
      "text-md py-2 px-6": size === "regular",
      "text-lg py-4 px-8": size === "large",
    },
    { "w-fit": widthType === "content", "w-full": widthType === "layout" },
    restProps.className
  );
  return (
    <button
      {...restProps}
      className={`py-1 px-4 font-semibold ${buttonStyles}`}
    >
      {children}
    </button>
  );
}
