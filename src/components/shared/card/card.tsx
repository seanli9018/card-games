'use client';

import { useState, forwardRef } from 'react';
import { useSpring, animated, useSpringRef, useChain } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import clsx from 'clsx';
import type { CardProps } from './card.type';
import sty from './card.module.scss';

export default forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const {
    id,
    content = '',
    revealScale = 1.2,
    onSelectCommit,
    ...restProps
  } = props;
  const [revealCard, setRevealCard] = useState(false);

  // card flipping;
  const springRotateApi = useSpringRef();
  const { transform } = useSpring({
    ref: springRotateApi,
    from: {
      transform: 'rotateY(0deg)',
    },
    to: {
      transform: `rotateY(180deg)`,
    },
    config: { tension: 80, friction: 20 },
  });

  // card front zooming;
  const springZoomApi = useSpringRef();
  const { scale } = useSpring({
    ref: springZoomApi,
    config: { tension: 80, friction: 20 },
    from: { scale: '1' },
    to: {
      scale: revealCard ? revealScale.toString() : '1',
    },
  });

  // 1. flipping spring --> zooming spring;
  useChain([springRotateApi, springZoomApi]);

  const cardStyles = clsx(
    `aspect-[5/7] cursor-pointer`,
    {
      'transition-transform duration-300 ease-in-out hover:scale-105 md:hover:scale-110':
        !revealCard,
    },
    restProps.className,
    [sty.card]
  );

  const cardFrontStyles = clsx(
    'border-2 p-4 rounded-lg bg-gray-100 border-slate-200 text-neutral-900',
    [sty.cardFront]
  );
  const cardBackStyles = clsx('p-4 rounded-lg', [sty.cardBack]);

  const clickHandler = () => {
    setRevealCard(true);
    if (onSelectCommit) onSelectCommit(id);
  };

  // reason to useDrag to track mouse movement instead of onClick event is to compatible with drag action under stack view.
  const bind = useDrag(({ movement: [mx, my], down }) => {
    if (down) return;
    // when mouse up, check if its a click or drag
    if (Math.abs(mx) < 8 && Math.abs(my) < 8) {
      clickHandler();
    }
  });

  return (
    <div {...bind()} id={id} {...restProps} ref={ref} className={cardStyles}>
      <animated.div
        className={cardFrontStyles}
        style={{
          transform: transform.to((t) => `${t} rotateY(180deg)`),
          backfaceVisibility: 'hidden',
          scale: scale,
        }}
      >
        {content}
      </animated.div>
      <animated.div
        className={cardBackStyles}
        style={{
          transform,
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
});
