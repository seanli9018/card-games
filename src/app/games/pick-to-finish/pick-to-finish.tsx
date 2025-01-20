"use client";

import { useState } from "react";
import {
  Card,
  GameTransition,
  type ListValueWithLinearStyle,
} from "@/components";
import { oneLinerShuffleArray } from "@/utils";

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function PickToFinish({
  userTaskList,
}: {
  userTaskList: ListValueWithLinearStyle[];
}) {
  const [selectedCard, setSelectedCard] = useState("");

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const cards =
    userTaskList?.length >= 2
      ? oneLinerShuffleArray(userTaskList).map((taskItem, index) => {
          const displayStyle =
            selectedCard && selectedCard !== `card-${index}` ? "none" : "block";
          return (
            <li
              key={`${index}-${taskItem.value}`}
              className="flex-1 w-full block"
              style={{
                display: displayStyle,
              }}
            >
              <Card
                id={`card-${index}`}
                content={<CardContent text={taskItem.value} />}
                className="md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-xl"
                onSelectCommit={handleCardSelect}
              />
            </li>
          );
        })
      : null;

  return (
    <GameTransition
      intro="Shuffling..."
      introDelay={4}
      reverse
      totalCountdown={3}
    >
      <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
        {!selectedCard ? (
          <h2 className="font-semibold text-center">
            Now, it&apos;s Your Choice...
          </h2>
        ) : null}
        <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
          {cards}
        </ul>
      </main>
    </GameTransition>
  );
}
