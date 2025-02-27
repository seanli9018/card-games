import type { CardProps } from '@/components';
import type { revealMode, shuffleMode } from '@/types';

export interface CardsLayoutProps {
  cards: CardProps[];
  pickedCardId?: string;
  revealMode?: revealMode;
  shuffleMode?: shuffleMode;
}
