import type { ReactElement, ComponentPropsWithoutRef } from "react";
import type { VariantType, ShapeType, SizeType, WidthType } from "@/types";
import type { LinkProps } from "next/link";

export interface SharedButtonType {
  children: ReactElement | string;
  variant?: VariantType;
  shape?: ShapeType;
  size?: SizeType;
  widthType?: WidthType;
}

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children">,
    SharedButtonType {
  buttonType?: "button";
}

export interface LinkButtonProps
  extends LinkProps,
    SharedButtonType,
    Omit<ComponentPropsWithoutRef<"a">, "children" | keyof LinkProps> {
  buttonType?: "link";
}

export type ButtonType = ButtonProps | LinkButtonProps;
