import type { ComponentPropsWithoutRef, ReactElement } from "react";

export interface CardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title" | "content"> {
  content?: ReactElement | string;
}
