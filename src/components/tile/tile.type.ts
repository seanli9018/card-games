export interface TileProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: string;
  description?: string;
  tags?: string[];
}
