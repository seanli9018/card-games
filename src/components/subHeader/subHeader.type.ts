import type { ComponentPropsWithoutRef } from "react";

export interface SubHeaderProps
  extends Omit<ComponentPropsWithoutRef<"header">, "title"> {
  title?: string;
}
