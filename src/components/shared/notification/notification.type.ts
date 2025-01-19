import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { NotificationVariantType } from "../../../types";

export interface NotificationItem {
  title?: string;
  message?: string;
  imageSrc?: string | StaticImport;
  variant?: NotificationVariantType;
}

export interface NotificationProps
  extends NotificationItem,
    Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  onClose?: () => void;
}
