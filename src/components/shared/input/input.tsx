'use client';

import { useState, useEffect, isValidElement } from 'react';
import clsx from 'clsx';
import type { InputProps } from './input.type';

export default function Input({
  leadingIcon,
  trailingIcon,
  inputProps,
  error,
  resetValue,
  defaultValue = '',
  blurCommit = false,
  onBlur,
  onChange,
  onChangeCommit,
  valueValidator,
  ...restProps
}: InputProps) {
  const [inputValue, setInputValue] = useState(() => defaultValue);

  const inputContainerStyles = clsx(restProps.className);
  const inputStyles = clsx(
    `block min-w-0 grow py-1.5 pl-2 pr-2 text-base bg-slate-300 dark:bg-slate-800 
            placeholder:dark:text-gray-400 placeholder:text-gray-800 focus:outline focus:outline-0 sm:text-sm/6`,
    inputProps?.className
  );

  const inputLeadingIcon = isValidElement(leadingIcon) ? leadingIcon : null;
  const inputTrailingIcon = isValidElement(trailingIcon) ? trailingIcon : null;
  const inputError = isValidElement(error) ? (
    error
  ) : typeof error === 'string' ? (
    <span className="text-xs mt-1 text-red-600 dark:text-red-200">{error}</span>
  ) : null;

  const handleChangeCommit = () => {
    if (onChangeCommit) onChangeCommit(inputValue);
  };

  const handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (blurCommit) handleChangeCommit();
    if (onBlur) onBlur(evt);
  };

  const handleInputKeydown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.code === 'Enter') {
      handleChangeCommit();
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let isValueValidated = true;
    if (valueValidator) {
      isValueValidated = valueValidator(evt.target.value);
    }

    if (isValueValidated) {
      setInputValue(evt.target.value);
      if (onChange) onChange(evt.target.value);
    }
  };

  useEffect(() => {
    if (!resetValue) return;

    setInputValue('');
  }, [resetValue]);

  return (
    <div {...restProps} className={inputContainerStyles}>
      <div
        className="flex items-center rounded-md bg-slate-300 dark:bg-slate-800 px-3 
        outline outline-1 -outline-offset-1 outline-slate-600 has-[input:focus-within]:outline has-[input:focus-within]:outline-1 
        has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-slate-400"
      >
        {inputLeadingIcon}
        <input
          type="text"
          {...inputProps}
          className={inputStyles}
          value={inputValue}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        {inputTrailingIcon}
      </div>
      {inputError}
    </div>
  );
}
