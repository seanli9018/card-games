import type { ReactElement, ComponentPropsWithoutRef } from "react";
import type {
  VariantType,
  ShapeType,
  SizeType,
  Color,
  WidthType,
} from "@/types";
import type { LinkProps } from "next/link";

export interface SharedButtonType {
  children: ReactElement | string;
  variant?: VariantType;
  shape?: ShapeType;
  size?: SizeType;
  color?: Color;
  widthType?: WidthType;
  disabled?: boolean;
}

export interface ButtonProps
  extends Omit<
      ComponentPropsWithoutRef<"button">,
      "children" | "color" | "disabled"
    >,
    SharedButtonType {
  buttonType?: "button";
}

export interface LinkButtonProps
  extends LinkProps,
    SharedButtonType,
    Omit<
      ComponentPropsWithoutRef<"a">,
      "children" | "color" | keyof LinkProps
    > {
  buttonType?: "link";
}

export type ButtonType = ButtonProps | LinkButtonProps;
