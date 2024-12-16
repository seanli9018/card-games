import { TagProps } from "./tag.type";

export default function Tile({ label }: TagProps) {
  return (
    <span className="bg-slate-600 p-1 rounded-md text-xs text-slate-300">
      {label}
    </span>
  );
}
