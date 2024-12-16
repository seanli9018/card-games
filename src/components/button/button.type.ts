import type { ReactElement } from "react";
import type { VariantType } from "@/types";

export interface ButtonProps {
  children: ReactElement | string;
  variant: VariantType;
}
