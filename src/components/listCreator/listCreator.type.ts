export type LinearStyle = {
  startColor: string;
  endColor: string;
  startPos: number;
  endPos: number;
};

export type ListValueWithLinearStyle = {
  value: string;
} & LinearStyle;

export interface ListInputProps extends React.ComponentPropsWithoutRef<"div"> {
  error?: string;
  onChangeCommit?: (value: string) => void;
}
