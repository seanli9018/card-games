"use client";

import omit from "lodash/omit";
import { Tag, Button } from "..";
import { TileProps } from "./tile.type";

export default function Tile({
  title,
  description,
  tags = [],
  cta,
  ...restProps
}: TileProps) {
  const tagItems = tags.map((tag, index) => {
    return (
      <li key={index + tag}>
        <Tag label={tag} />
      </li>
    );
  });

  return (
    <div
      className="flex flex-col justify-between bg-slate-200 dark:bg-slate-800 p-4 rounded-lg"
      {...restProps}
    >
      <div>
        <div className="flex flex-row justify-between flex-wrap">
          <h3 className="text-lg font-semibold">{title}</h3>
          {Array.isArray(tags) && tags.length ? (
            <ul className="flex flex-row gap-1">{tagItems}</ul>
          ) : null}
        </div>
        <p className="mt-4 text-sm">{description}</p>
      </div>
      <div className="mt-4">
        {cta?.children ? (
          <Button size="small" variant="primary" {...omit(cta, "children")}>
            {cta.children}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
