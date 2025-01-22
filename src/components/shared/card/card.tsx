"use client";

import { useState, forwardRef } from "react";
import { useSpring, animated, useSpringRef, useChain } from "@react-spring/web";
import clsx from "clsx";
import type { CardProps } from "./card.type";
import sty from "./card.module.scss";

export default forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const {
    id,
    content = "",
    revealScale = 1.2,
    onSelectCommit,
    ...restProps
  } = props;
  const [revealCard, setRevealCard] = useState(false);

  // card flipping;
  const springRotateApi = useSpringRef();
  const { transform, opacity } = useSpring({
    ref: springRotateApi,
    opacity: revealCard ? 1 : 0,
    transform: `rotateY(${revealCard ? 180 : 0}deg)`,
  });

  // card front zooming;
  const springZoomApi = useSpringRef();
  const { scale } = useSpring({
    ref: springZoomApi,
    config: { tension: 80, friction: 20 },
    from: { scale: "1" },
    to: {
      scale: revealCard ? revealScale.toString() : "1",
    },
  });

  // 1. flipping spring --> zooming spring;
  useChain([springRotateApi, springZoomApi]);

  const cardStyles = clsx(
    `aspect-[5/7] cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
    {
      "transition-transform duration-300 ease-in-out hover:scale-105 md:hover:scale-110":
        !revealCard,
    },
    restProps.className,
    [sty.card]
  );

  const cardFrontStyles = clsx(
    "border-2 p-4 rounded-lg bg-gray-100 border-slate-200 text-neutral-900",
    [sty.cardFront]
  );
  const cardBackStyles = clsx("p-4 rounded-lg", [sty.cardBack]);

  const clickHandler = () => {
    setRevealCard(true);
    if (onSelectCommit) onSelectCommit(id);
  };

  return (
    <div
      id={id}
      {...restProps}
      ref={ref}
      className={cardStyles}
      onClick={clickHandler}
    >
      <animated.div
        className={cardFrontStyles}
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
          backfaceVisibility: "hidden",
          scale: scale,
        }}
      >
        {content}
      </animated.div>
      <animated.div
        className={cardBackStyles}
        style={{
          opacity: opacity.to((o) => 1 - o),
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
});
