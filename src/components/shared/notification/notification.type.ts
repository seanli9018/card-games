import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface NotificationItem {
  title?: string;
  message?: string;
  imageSrc?: string | StaticImport;
}

export interface NotificationProps
  extends NotificationItem,
    Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  onClose?: () => void;
}
