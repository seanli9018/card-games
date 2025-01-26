'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardsFlex } from '@/components';
import activityFetcher from './activity-fetcher';

function CardContent({
  title,
  details,
}: {
  title: string;
  details?: string[];
}) {
  return (
    <div className="h-full flex flex-col justify-center">
      <span className="text-xl font-semibold mb-4 block">
        {title as string}
      </span>
      {Array.isArray(details) && details.length ? (
        <>
          {details.map((item) => (
            <span key={item} className="block text-base">
              {item}
            </span>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default function BoredNoMore() {
  const [selectedCard, setSelectedCard] = useState('');
  const { data, error } = useQuery({
    queryKey: ['random-activity'],
    queryFn: activityFetcher,
  });

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const cardsProps = Array.from({ length: 6 }).map((_, index) => {
    return {
      id: `card-${index}`,
      content: (
        <CardContent
          title={data?.description}
          details={[
            `Participants: ${data?.participants}`,
            `Kid friendly: ${data?.kidFriendly ? 'Yes' : 'No'}`,
          ]}
        />
      ),
      className: 'md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-xl',
      onSelectCommit: handleCardSelect,
    };
  });

  return (
    <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
      {!selectedCard ? (
        <h2 className="font-semibold text-center">
          Now, it&apos;s Your Choice...
        </h2>
      ) : null}
      {!error && data ? (
        <CardsFlex
          cards={cardsProps}
          pickedCardId={selectedCard}
          revealMode="single"
          shuffleMode="none"
        />
      ) : null}
      {error && !data ? (
        <div className="h-full flex justify-center items-center">
          <span>Sorry, looks like something went wrong</span>
        </div>
      ) : null}
    </main>
  );
}
