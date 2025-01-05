import Image from "next/image";
import Button from "../button";
import type { NotificationProps } from "./notification.type";

export default function Notification({
  title = "",
  message = "",
  imageSrc,
  onClose,
}: NotificationProps) {
  return (
    <div
      className="border border-blue-300 bg-slate-200 dark:bg-slate-800 
    shadow rounded-md p-2 max-w-sm w-full mx-auto 
    fixed top-20 right-5 z-50"
    >
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
          <div className="flex flex-row justify-between ">
            {title ? (
              <h3 className="text-md font-semibold leading-7">{title}</h3>
            ) : null}
            <Button
              variant="tertiary"
              size="small"
              className="text-gray-200 self-end"
              onClick={onClose}
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
