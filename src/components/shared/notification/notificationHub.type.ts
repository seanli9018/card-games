import { NotificationItem } from "./notification.type";

export interface NotificationItemData extends NotificationItem {
  key: number;
}

export type AddNotificationCBFunction = ({
  title,
  message,
  imageSrc,
}: NotificationItem) => void;

export interface NotificationHubProps {
  timeout?: number;
  addNotification?: (addNotificationCB: AddNotificationCBFunction) => void;
}
