import { Card } from '../..';
import { oneLinerShuffleArray, fisherYatesShuffleArray } from '@/utils';
import type { CardsLayoutProps } from '../cardsLayout.type';

export default function CardsFlex({
  cards,
  pickedCardId,
  revealMode = 'single',
  shuffleMode = 'fisherYates',
}: CardsLayoutProps) {
  if (!cards || !cards.length) return null;

  const shuffledCards =
    shuffleMode === 'fisherYates'
      ? fisherYatesShuffleArray(cards)
      : shuffleMode === 'oneLiner'
        ? oneLinerShuffleArray(cards)
        : cards;

  const cardsElement = shuffledCards.map((cardProp, index) => {
    //Once player picked one card, other cards will be hidden under single reveal mode.
    const displayStyle =
      pickedCardId && revealMode === 'single' && pickedCardId !== cardProp.id
        ? 'none'
        : 'flex';
    return (
      <li
        key={`${index}-${cardProp.id}`}
        className="flex-1 w-full flex justify-center items-center"
        style={{
          display: displayStyle,
        }}
      >
        <Card {...cardProp} />
      </li>
    );
  });

  return (
    <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
      {cardsElement}
    </ul>
  );
}
