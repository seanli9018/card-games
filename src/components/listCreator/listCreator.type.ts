import type { ReactElement } from "react";

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

export interface ListCreatorProps
  extends React.ComponentPropsWithoutRef<"div"> {
  commitBtnLabel?: string | ReactElement;
  onCommitBtnClick?: (taskList: ListValueWithLinearStyle[]) => void;
}
