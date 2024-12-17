import type { ReactElement, ComponentPropsWithoutRef } from "react";
import type { VariantType, ShapeType, SizeType, WidthType } from "@/types";

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  children: ReactElement | string;
  variant?: VariantType;
  shape?: ShapeType;
  size?: SizeType;
  widthType?: WidthType;
}
