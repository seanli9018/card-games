import type { ReactElement } from "react";
import type { AbsolutePositionType } from "@/types";

export interface DropdownContainerProps {
  open?: boolean;
  children?: ReactElement;
  position?: AbsolutePositionType;
  content?: ReactElement;
  onClose?: () => void;
}
