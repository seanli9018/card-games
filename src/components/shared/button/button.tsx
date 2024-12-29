"use client";
import clsx from "clsx";
import Link from "next/link";
import { ButtonType, LinkButtonProps, ButtonProps } from "./button.type";

export default function Button(props: ButtonType) {
  const {
    children,
    variant = "primary",
    shape = "rectangle",
    size = "regular",
    color = "regular",
    widthType = "content",
    buttonType = "button",
    ...restProps
  } = props;

  if (!children) return;

  const buttonStyles = clsx(
    {
      "focus:outline-none focus:ring-1 focus:ring-opacity-75":
        variant === "primary" || variant === "tertiary",
      "border focus:outline-none focus:ring-1 focus:ring-opacity-75":
        variant === "secondary",
    },
    {
      "bg-sky-600/75 text-white hover:bg-sky-600 focus:ring-sky-400":
        variant === "primary" && color === "regular",
      "bg-transparent hover:bg-sky-400/25 text-sky-600 hover:text-sky-800 border-sky-600 hover:border-sky-800 focus:ring-sky-400":
        variant === "secondary" && color === "regular",
      "bg-transparent hover:bg-sky-400/25 text-sky-600 hover:text-sky-400 focus:ring-sky-400":
        variant === "tertiary" && color === "regular",
      "bg-gray-600/75 text-white hover:bg-gray-600 focus:ring-gray-400":
        variant === "primary" && color === "monochromatic",
      "bg-transparent hover:bg-gray-400/25 text-gray-600 hover:text-gray-800 dark:hover:text-gray-100 border-gray-600 hover:border-gray-800 focus:ring-gray-400":
        variant === "secondary" && color === "monochromatic",
      "bg-transparent hover:bg-gray-400/25 text-gray-600 hover:text-gray-400 focus:ring-gray-400":
        variant === "tertiary" && color === "monochromatic",
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

  if (buttonType === "link") {
    const linkRestProps = restProps as LinkButtonProps;
    return (
      <Link
        {...linkRestProps}
        className={`py-1 px-4 font-semibold inline-block ${buttonStyles}`}
      >
        {children}
      </Link>
    );
  }

  const buttonRestProps = restProps as ButtonProps;
  return (
    <button
      {...buttonRestProps}
      className={`py-1 px-4 font-semibold ${buttonStyles}`}
    >
      {children}
    </button>
  );
}
