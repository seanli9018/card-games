import { ReactElement } from "react";

export interface GameTransitionProps {
  intro: string | ReactElement;
  introDelay?: number; //seconds
  totalCountdown?: number;
}
