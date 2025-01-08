import type { ReactElement } from "react";

export interface GameTransitionProps {
  intro: string | ReactElement;
  children?: ReactElement | ReactElement[];
  introDelay?: number; //seconds
  totalCountdown?: number;
  reverse?: boolean;
}
