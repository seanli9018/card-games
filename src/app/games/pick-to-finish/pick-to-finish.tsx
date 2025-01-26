'use client';

import { useMemo } from 'react';
import { Card, GameTransition } from '@/components';
import { oneLinerShuffleArray } from '@/utils';
import { PickToFinishProps } from './pick-to-finish.type';

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function PickToFinish({
  taskList,
  cardCount,
}: PickToFinishProps) {
  const cardList = useMemo(() => {
    // if we have enough tasks to generate cards.
    if (taskList.length >= cardCount) {
      return oneLinerShuffleArray(taskList).slice(
        0,
        taskList.length - cardCount
          ? -(taskList.length - cardCount)
          : taskList.length
      );
    }

    // if there is not enough tasks to generate cards, we push empty cards.
    const emptyValueArray = Array.from(
      { length: cardCount - taskList.length },
      () => ({
        value: '',
      })
    );

    return oneLinerShuffleArray([...taskList, ...emptyValueArray]);
  }, [taskList, cardCount]);

  const cards = cardList?.length
    ? cardList.map((taskItem, index) => {
        return (
          <li
            key={`${index}-${taskItem.value}`}
            className="flex-1 w-full block"
          >
            <Card
              id={`card-${index}`}
              content={<CardContent text={taskItem.value} />}
              revealScale={1}
              className="md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-xl"
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
        <h2 className="font-semibold text-center">
          Now, pick one card at a time...
        </h2>
        <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
          {cards}
        </ul>
      </main>
    </GameTransition>
  );
}
