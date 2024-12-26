"use client";

import { Children } from "react";
import { useTrail, animated } from "@react-spring/web";
import { TrailProps } from "./trail.type";

export default function Trail({
  open,
  children,
  itemHeight = 120,
  itemX = 40,
  ...restProps
}: TrailProps) {
  const items = Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : itemX,
    height: open ? itemHeight : 0,
    from: { opacity: 0, x: 60, height: 0 },
  });

  return (
    <div {...restProps}>
      {trail.map(({ height, ...style }, index) => (
        <animated.div
          key={index}
          className="relative w-full will-change-transform overflow-hidden"
          style={{ height: itemHeight, ...style }}
        >
          <animated.div className="pr-2 overflow-hidden" style={{ height }}>
            {items[index]}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}
