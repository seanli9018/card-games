import { Card } from '../..';
import { oneLinerShuffleArray, fisherYatesShuffleArray } from '@/utils';
import type { CardsFlexProps } from './cardsFlex.type';

export default function CardsFlex({
  cards,
  pickedCardId,
  revealMode = 'single',
  shuffleMode = 'oneLiner',
}: CardsFlexProps) {
  if (!cards || !cards.length) return null;

  const shuffledCard =
    shuffleMode === 'oneLiner'
      ? oneLinerShuffleArray(cards)
      : fisherYatesShuffleArray(cards);

  const cardsElement = shuffledCard.map((cardProp, index) => {
    //Once player picked one card, other cards will be hidden under single reveal mode.
    const displayStyle =
      pickedCardId && revealMode === 'single' && pickedCardId !== cardProp.id
        ? 'none'
        : 'block';

    return (
      <li
        key={`${index}-${cardProp.id}`}
        className="flex-1 w-full block"
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
