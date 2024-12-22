import type { ComponentPropsWithoutRef, ReactElement } from "react";

export interface TrailProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactElement | ReactElement[];
  open?: boolean;
  itemHeight?: number;
  itemX?: number;
}
