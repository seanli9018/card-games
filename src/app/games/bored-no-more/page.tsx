"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SubHeader } from "@/components";
import { GameTransition } from "@/components/shared";
import BoredNoMore from "./bored-no-more";

// Create a client
const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameTransition
        intro="Feeling bored? Pick a card from a set of random activity cards to liven things up!"
        introDelay={8}
        totalCountdown={3}
      />
      <SubHeader title="Pick A Card!" />
      <BoredNoMore />
    </QueryClientProvider>
  );
}
