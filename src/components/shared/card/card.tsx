"use client";

import { useState, forwardRef } from "react";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
import clsx from "clsx";
import type { CardProps } from "./card.type";
import sty from "./card.module.scss";

export default forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { content = "", ...restProps } = props;
  const [revealCard, setRevealCard] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: revealCard ? 1 : 0,
    transform: `rotateY(${revealCard ? 180 : 0}deg)`,
  });
  const transition = useSpringValue("transform 600ms, opacity 800ms");

  const cardStyles = clsx(
    `aspect-[5/7] cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    transition-transform duration-300 ease-in-out hover:scale-105 md:hover:scale-110`,
    restProps.className,
    [sty.card]
  );
  const cardFrontStyles = clsx(
    "border-2 border-slate-800 p-4 rounded-lg bg-slate-800",
    [sty.cardFront]
  );
  const cardBackStyles = clsx("border-2 border-slate-800 p-4 rounded-lg", [
    sty.cardBack,
  ]);

  const clickHandler = () => {
    setRevealCard(true);
  };

  return (
    <div {...restProps} ref={ref} className={cardStyles} onClick={clickHandler}>
      <animated.div
        className={cardFrontStyles}
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
          transition,
          backfaceVisibility: "hidden",
        }}
      >
        {content}
      </animated.div>
      <animated.div
        className={cardBackStyles}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transition,
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
});
