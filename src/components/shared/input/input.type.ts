import type { ReactElement, ComponentPropsWithoutRef, FocusEvent } from 'react';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'onBlur'> {
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  inputProps?: ComponentPropsWithoutRef<'input'>;
  resetValue?: boolean;
  defaultValue?: string;
  error?: string | ReactElement;
  blurCommit?: boolean;
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
  onChangeCommit?: (value: string) => void;
  valueValidator?: (value: string) => boolean;
}
