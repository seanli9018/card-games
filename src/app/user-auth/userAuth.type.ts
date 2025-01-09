import type { ReactElement } from "react";

export type UserAuthModeType = "login" | "register";

export interface LoginInputProps extends React.ComponentPropsWithoutRef<"div"> {
  leadingIcon?: ReactElement;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
  resetValue?: boolean;
  error?: string;
  onChangeCommit?: (value: string) => void;
}
