import { SubHeader } from "@/components";
import { GameTransition } from "@/components";
import BoredNoMore from "./bored-no-more";

export default function Page() {
  return (
    <GameTransition
      intro="Feeling bored? Pick a card from a set of random activity cards to liven things up!"
      introDelay={8}
      totalCountdown={3}
    >
      <SubHeader title="Pick A Card!" />
      <BoredNoMore />
    </GameTransition>
  );
}
