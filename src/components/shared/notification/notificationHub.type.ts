import { NotificationItem } from "./notification.type";
import { NotificationVariantType } from "@/types";

export interface NotificationItemData extends NotificationItem {
  key: number;
}

export type AddNotificationCBFunction = ({
  title,
  message,
  imageSrc,
}: NotificationItem) => void;

export interface NotificationHubProps
  extends React.ComponentPropsWithoutRef<"div"> {
  timeout?: number;
  variant?: NotificationVariantType;
  addNotification?: (addNotificationCB: AddNotificationCBFunction) => void;
}
