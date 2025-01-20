import type { ReactElement, ReactNode } from "react";
import type { SizeType, DirectionType } from "@/types";

export interface StepItem {
  label: string | ReactElement;
  children?: ReactNode;
}

export interface StepProgressProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  steps: StepItem[];
  direction?: DirectionType;
  size?: SizeType;
  onForward?: (currentStep: number) => boolean;
}
