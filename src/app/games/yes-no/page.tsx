"use client";
import { useState } from "react";
import { SubHeader, Card } from "@/components";
import { randomInArray } from "@/utils/randomUtil";
import { GameTransition } from "@/components/shared";

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function Page() {
  const [selectedCard, setSelectedCard] = useState("");
  const chosenItem = randomInArray(["YES", "NO"]) as string;

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const cards = Array.from({ length: 2 }).map((_, index) => {
    const displayStyle =
      selectedCard && selectedCard !== `card-${index}` ? "none" : "block";
    return (
      <li
        key={`${index}`}
        className="flex-1 w-full block"
        style={{
          display: displayStyle,
        }}
      >
        <Card
          id={`card-${index}`}
          content={<CardContent text={chosenItem} />}
          className="max-h-96 min-w-64 text-4xl"
          onSelectCommit={handleCardSelect}
        />
      </li>
    );
  });

  return (
    <>
      <GameTransition
        intro="Please recite the question silently in your mind..."
        totalCountdown={5}
        reverse
      />
      <SubHeader title="Yes? or No?" />
      <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
        <h2 className="font-semibold text-center">
          Now, it&apos;s Your Choice...
        </h2>
        <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
          {cards}
        </ul>
      </main>
    </>
  );
}
