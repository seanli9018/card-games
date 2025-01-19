import type { MouseEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import Button from "../button";
import type { NotificationProps } from "./notification.type";

export default function Notification({
  title = "",
  message = "",
  imageSrc,
  variant = "info",
  onClose,
  ...restProps
}: NotificationProps) {
  const notificationContainer = clsx(
    "border shadow rounded-md p-2 max-w-sm w-full mx-auto",
    {
      "border-blue-300 bg-slate-200 dark:bg-slate-800": variant === "info",
      "border-orange-300 bg-orange-100 dark:bg-orange-800": variant === "warn",
      "border-rose-300 bg-rose-100 dark:bg-rose-800": variant === "error",
    },
    restProps.className
  );

  return (
    <div className={notificationContainer}>
      <div className="flex space-x-4">
        {imageSrc ? (
          <Image
            src={imageSrc}
            width={30}
            height={30}
            alt="Notice Image"
            className="bg-slate-800 rounded-full self-center"
            aria-hidden
          />
        ) : null}
        <div className="flex-1 space-y-2 py-1">
          <div className="flex flex-row justify-between leading-6">
            {title ? <h3 className="text-md font-semibold">{title}</h3> : null}
            <Button
              variant="tertiary"
              size="small"
              shape="round"
              color="monochromatic"
              className="text-gray-200 self-end"
              style={{ padding: "2px" }}
              onClick={(evt: MouseEvent) => {
                evt.stopPropagation();
                if (onClose) onClose();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          {message ? (
            <div className="space-y-3">
              <div className="text-sm">{message}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
