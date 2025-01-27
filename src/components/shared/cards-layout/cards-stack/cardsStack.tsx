'use client';

import React, { useRef, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Card } from '../..';
import { fisherYatesShuffleArray, oneLinerShuffleArray } from '@/utils';
import type { CardsLayoutProps } from '../cardsLayout.type';
import sty from './cardsStack.module.scss';

export default function CardsStack({
  cards,
  pickedCardId,
  revealMode = 'single',
  shuffleMode = 'fisherYates',
}: CardsLayoutProps) {
  const shuffledCards =
    shuffleMode === 'fisherYates'
      ? fisherYatesShuffleArray(cards)
      : shuffleMode === 'oneLiner'
        ? oneLinerShuffleArray(cards)
        : cards;
  // Store positions for each card using useRef
  const positionsRef = useRef(shuffledCards.map(() => ({ x: 0, y: 0 })));

  // useSprings utils
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    rot: -10 + Math.random() * 20,
    scale: 1,
    delay: i * 200,
  });
  const from = () => ({ x: 0, y: -1000, rot: 0, scale: 1.5 });
  // This is being used down there in the jsx, it interpolates rotation and scale into a css transform
  const trans = (rot: number, scale: number) =>
    `perspective(1500px) rotateX(15deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(${scale})`;
  // useSprings
  const [springs, api] = useSprings(shuffledCards.length, (i) => ({
    ...to(i),
    from: from(),
  }));

  // Not sure why useSprings is not animating on-mount.
  // Work around: force react spring to re-render and animation when first time on mount.
  useEffect(() => {
    if (!api?.start) return;
    api.start((i) => to(i));
  }, [api]);

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      return {
        x: mx + positionsRef.current[i].x,
        y: my + positionsRef.current[i].y,
        scale: down ? 1.1 : 1,
        config: { friction: 50, tension: down ? 800 : 500 },
      };
    });
    if (!down) {
      positionsRef.current[index] = {
        x: springs[index].x.get(),
        y: springs[index].y.get(),
      };
    }
  });

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="relative flex justify-center items-center w-full h-full flex-1">
      {springs.map(({ x, y, rot, scale }, i) => {
        // For single reveal mode, when one card picked,
        // End game and hide other cards, and reset all transition to default.
        const isCardNotSelectedWhenPicked =
          pickedCardId &&
          revealMode === 'single' &&
          pickedCardId !== shuffledCards[i].id;
        const isCardSelectedWhenPicked =
          pickedCardId &&
          revealMode === 'single' &&
          pickedCardId === shuffledCards[i].id;

        return (
          <animated.div
            className={sty.deck}
            key={i}
            style={{
              x: isCardSelectedWhenPicked ? 0 : x,
              y: isCardSelectedWhenPicked ? 0 : y,
              display: isCardNotSelectedWhenPicked ? 'none' : 'flex',
            }}
          >
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: isCardSelectedWhenPicked
                  ? 'none'
                  : interpolate([rot, scale], trans),
              }}
            >
              <Card {...shuffledCards[i]} />
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
}
