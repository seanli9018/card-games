import { Tag } from "..";
import { TileProps } from "./tile.type";

export default function Tile({
  title,
  description,
  tags = [],
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
    <div className="bg-slate-800 p-4 rounded-lg" {...restProps}>
      <h3>{title}</h3>
      <p>{description}</p>
      {Array.isArray(tags) && tags.length ? (
        <ul className="flex flex-row gap-1 mt-4">{tagItems}</ul>
      ) : null}
    </div>
  );
}
