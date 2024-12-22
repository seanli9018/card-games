"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const Test = () => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        width: 300,
        height: 200,
        perspective: 1000,
        position: "relative",
      }}
    >
      <animated.div
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "green",
          backfaceVisibility: "hidden",
        }}
      >
        Front Side
      </animated.div>
      <animated.div
        style={{
          opacity,
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "red",
          backfaceVisibility: "hidden",
          transform: transform.to((t) => `${t} rotateY(180deg)`),
        }}
      >
        fff
      </animated.div>
    </div>
  );
};

export default Test;
