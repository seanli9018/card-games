import type { ComponentPropsWithoutRef } from "react";
import type { ButtonProps } from "../button/button.type";

export interface TileProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title?: string;
  description?: string;
  tags?: string[];
  cta?: ButtonProps;
}
