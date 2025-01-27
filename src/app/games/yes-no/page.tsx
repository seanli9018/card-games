'use client';
import { useState } from 'react';
import { SubHeader, CardsFlex } from '@/components';
import { randomInArray } from '@/utils/randomUtil';
import { GameTransition } from '@/components';

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function Page() {
  const [selectedCard, setSelectedCard] = useState('');
  const chosenItem = randomInArray(['YES', 'NO']) as string;

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const cardsProps = Array.from({ length: 2 }).map((_, index) => ({
    id: `card-${index}`,
    content: <CardContent text={chosenItem} />,
    className: 'md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-4xl',
    onSelectCommit: handleCardSelect,
  }));

  return (
    <>
      <GameTransition
        intro="Please recite the question silently in your mind..."
        totalCountdown={5}
        reverse
      >
        <SubHeader title="Yes? or No?" />
        <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
          {!selectedCard ? (
            <h2 className="font-semibold text-center">
              Now, it&apos;s Your Choice...
            </h2>
          ) : null}
          <CardsFlex
            cards={cardsProps}
            pickedCardId={selectedCard}
            revealMode="single"
            shuffleMode="none"
          />
        </main>
      </GameTransition>
    </>
  );
}
