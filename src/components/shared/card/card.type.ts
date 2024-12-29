import type { ComponentPropsWithoutRef, ReactElement } from "react";

export interface CardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title" | "content" | "id"> {
  id: string;
  content?: ReactElement | string;
  onSelectCommit?: (id?: string) => void;
}
