import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface NotificationProps {
  title?: string;
  message?: string;
  imageSrc?: string | StaticImport;
  onClose?: () => void;
}
