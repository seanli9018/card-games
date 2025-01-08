"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components";
import { randomHexColor, randomRangeFromZero } from "@/utils";
import {
  ListInputProps,
  ListValueWithLinearStyle,
  LinearStyle,
  ListCreatorProps,
} from "./listCreator.type";

import style from "./listCreator.module.scss";

function ListInput({ onChangeCommit, error, ...restProps }: ListInputProps) {
  const [inputValue, setInputValue] = useState("");

  const listContainerStyles = clsx(restProps.className);

  const handleChangeCommit = () => {
    if (!inputValue.trim()) return;
    if (onChangeCommit) onChangeCommit(inputValue.trim());
    setInputValue("");
  };

  const handleAddButtonClick = () => {
    handleChangeCommit();
  };

  const handleInputKeydown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter" || evt.code === "Enter") {
      handleChangeCommit();
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  return (
    <div {...restProps} className={listContainerStyles}>
      <div
        className="flex items-center rounded-md bg-slate-300 dark:bg-slate-800 pl-3 
        outline outline-1 -outline-offset-1 outline-slate-600 has-[input:focus-within]:outline has-[input:focus-within]:outline-1 
        has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-slate-400"
      >
        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="task"
          id="task"
          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base bg-slate-300 dark:bg-slate-800 
            placeholder:dark:text-gray-400 placeholder:text-gray-800 focus:outline focus:outline-0 sm:text-sm/6"
          placeholder="Enter activity, challenge, or task"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
          <Button
            variant="tertiary"
            onClick={handleAddButtonClick}
            disabled={!inputValue}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </div>
      {error ? (
        <span className="text-xs mt-1 text-red-600 dark:text-red-200">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default function ListCreator({
  commitBtnLabel = "",
  onCommitBtnClick,
  ...restProps
}: ListCreatorProps) {
  const [taskList, setTaskList] = useState<ListValueWithLinearStyle[]>([]);
  const [inputError, setInputError] = useState("");

  const listCreatorStyles = clsx("flex flex-col gap-8", restProps.className);

  const generateRandomListLinear: () => LinearStyle = () => {
    return {
      startColor: randomHexColor(),
      endColor: randomHexColor(),
      startPos: randomRangeFromZero(50)!,
      endPos: randomRangeFromZero(50)! + 50,
    };
  };

  const handleInputChangeCommit = (value: string) => {
    const linearStyle = generateRandomListLinear();
    setTaskList((prevList) => {
      const duplicatedItemIndex = prevList.findIndex((item) => {
        return item.value === value;
      });
      // Only add new value if no existing value.
      if (duplicatedItemIndex < 0) {
        setInputError("");
        return [
          ...prevList,
          {
            value,
            ...linearStyle,
          },
        ];
      }
      // Otherwise return original list.
      setInputError(`'${value}' is already existed in the activity list.`);
      return prevList;
    });
  };

  const handleListItemRemoval = (value: string) => {
    setInputError("");
    setTaskList((prevList) => {
      const targetItemIndex = prevList.findIndex((item) => {
        return item.value === value;
      });

      const newList = [
        ...prevList.slice(0, targetItemIndex),
        ...prevList.slice(targetItemIndex + 1),
      ];
      return newList;
    });
  };

  const handleCommitButtonClick = () => {
    if (onCommitBtnClick) onCommitBtnClick(taskList);
  };

  const listElements = Array.from(taskList).map((item, index) => {
    return (
      <li
        key={`${index}-${item}`}
        className="h-10 pl-4 flex items-center justify-between text-xl font-semibold rounded-md"
        style={{
          background: `linear-gradient(
            135deg, 
            ${item.startColor} 
            ${item.startPos}%, 
            ${item.endColor} 
            ${item.endPos}%
          )`,
        }}
      >
        <p className={style.listText}>{item.value}</p>
        <Button
          variant="tertiary"
          onClick={() => handleListItemRemoval(item.value)}
          className="text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14"
              style={{
                outline: `1px solid ${
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#1f2937" //colors.gray.800
                    : "#e5e7eb" //colors.gray.200
                }`,
              }}
            />
          </svg>
        </Button>
      </li>
    );
  });

  return (
    <div {...restProps} className={listCreatorStyles}>
      <h1 className="text-lg font-semibold">
        Please create your activity list.
      </h1>
      {!!taskList.length ? (
        <ul className="flex flex-col gap-8 items-stretch justify-center">
          {listElements}
        </ul>
      ) : null}
      <ListInput onChangeCommit={handleInputChangeCommit} error={inputError} />
      {commitBtnLabel ? (
        <Button
          variant="primary"
          widthType="layout"
          disabled={taskList.length === 0}
          onClick={handleCommitButtonClick}
        >
          I am ready
        </Button>
      ) : null}
    </div>
  );
}
