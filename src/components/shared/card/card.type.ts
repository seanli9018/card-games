import type { ComponentPropsWithoutRef } from "react";

export interface CardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title?: string;
}
