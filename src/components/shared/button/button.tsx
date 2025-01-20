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
    disabled = false,
    ...restProps
  } = props;

  if (!children) return;

  const _color = disabled ? "disabled" : color;

  const buttonStyles = clsx(
    {
      "focus:outline-none focus:ring-1 focus:ring-opacity-75":
        (variant === "primary" && !disabled) ||
        (variant === "tertiary" && !disabled),
      "border focus:outline-none focus:ring-1 focus:ring-opacity-75":
        variant === "secondary" && !disabled,
    },
    {
      "bg-sky-600/75 hover:bg-sky-600 text-white focus:ring-sky-400":
        variant === "primary" && _color === "regular",
      "bg-transparent hover:bg-sky-400/25 text-sky-600 hover:text-sky-800 dark:hover:text-sky-200 border-sky-600 hover:border-sky-800 focus:ring-sky-400":
        variant === "secondary" && _color === "regular",
      "bg-transparent hover:bg-sky-400/25 text-sky-600 hover:text-sky-400 dark:hover:text-sky-200 focus:ring-sky-400":
        variant === "tertiary" && _color === "regular",
      "bg-gray-600/75 hover:bg-gray-600 text-white focus:ring-gray-400":
        variant === "primary" && _color === "monochromatic",
      "bg-transparent hover:bg-gray-400/25 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border-gray-600 hover:border-gray-800 focus:ring-gray-400":
        variant === "secondary" && _color === "monochromatic",
      "bg-transparent hover:bg-gray-400/25 text-gray-600 dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-100 focus:ring-gray-400":
        variant === "tertiary" && _color === "monochromatic",
      "bg-gray-600/75 text-gray-200 cursor-default":
        variant === "primary" && _color === "disabled",
      "bg-transparent text-gray-600 border-gray-600 cursor-default":
        variant === "secondary" && _color === "disabled",
      "bg-transparent text-gray-600 cursor-default":
        variant === "tertiary" && _color === "disabled",
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
