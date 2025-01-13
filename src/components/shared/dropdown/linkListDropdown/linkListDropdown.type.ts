import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { AbsolutePositionType } from "@/types";

export interface LinkItem extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  label: string;
  href: string;
}

export type LinkGroupType = (LinkItem | ReactElement)[];

export interface LinkListDropdownProps {
  open?: boolean;
  title?: string | ReactElement;
  linkGroups: LinkGroupType[];
  children: ReactElement;
  position?: AbsolutePositionType;
  onClose?: () => void;
}
