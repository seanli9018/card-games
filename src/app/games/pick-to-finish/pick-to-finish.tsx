'use client';

import { useMemo } from 'react';
import { GameTransition, CardsFlex } from '@/components';
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
      return taskList.slice(
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

    return [...taskList, ...emptyValueArray];
  }, [taskList, cardCount]);

  const cardsProps = cardList?.length
    ? cardList.map((taskItem, index) => {
        return {
          id: `card-${index}`,
          content: <CardContent text={taskItem.value} />,
          revealScale: 1,
          className: 'md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-xl',
        };
      })
    : [];

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
        <CardsFlex cards={cardsProps} revealMode="multiple" />
      </main>
    </GameTransition>
  );
}
