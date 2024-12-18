"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import type { CardProps } from "./card.type";

export default forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { title = "", ...restProps } = props;

  const cardStyles = clsx(
    "aspect-[5/7] border-2 p-4 rounded-lg cursor-pointer",
    restProps.className
  );

  return (
    <div {...restProps} ref={ref} className={cardStyles}>
      {title}
    </div>
  );
});
