import type { ComponentPropsWithoutRef } from "react";
import type { UserType } from "@/types";

export interface LinkItem extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  label: string;
  href: string;
}

export type LinkGroupType = LinkItem[];

export interface DropdownProps {
  open?: boolean;
  user: UserType | null;
  linkGroups: LinkGroupType[];
}
