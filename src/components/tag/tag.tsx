import { TagProps } from "./tag.type";

export default function Tile({ label }: TagProps) {
  return (
    <span className="bg-slate-100 dark:bg-slate-600 text-xs text-slate-800 dark:text-slate-300 p-1 rounded-md">
      {label}
    </span>
  );
}
