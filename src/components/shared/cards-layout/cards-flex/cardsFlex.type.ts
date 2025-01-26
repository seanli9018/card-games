import type { CardProps } from '@/components';
import type { revealMode, shuffleMode } from '@/types';

export interface CardsFlexProps {
  cards: CardProps[];
  pickedCardId?: string;
  revealMode?: revealMode;
  shuffleMode?: shuffleMode;
}
