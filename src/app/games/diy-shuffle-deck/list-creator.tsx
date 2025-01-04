"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components";
import { randomHexColor, randomRangeFromZero } from "@/utils";
import { ListInputProps } from "./diy-shuffle-deck.type";

function ListInput({ onChangeCommit, ...restProps }: ListInputProps) {
  const [inputValue, setInputValue] = useState("");

  const listContainerStyles = clsx(restProps.className);

  const handleChangeCommit = () => {
    if (!inputValue) return;
    if (onChangeCommit) onChangeCommit(inputValue);
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
    </div>
  );
}

export default function ListCreator() {
  const [listSet, setListSet] = useState<Set<string>>(new Set());

  const handleInputChangeCommit = (value: string) => {
    setListSet((prevSet) => new Set([...prevSet, value]));
  };

  const handleListItemRemoval = (value: string) => {
    setListSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value); // Remove the value
      return newSet;
    });
  };

  const listElements = Array.from(listSet).map((item, index) => {
    const startColor = randomHexColor();
    const endColor = randomHexColor();
    const startPos = randomRangeFromZero(50);
    const endPos = randomRangeFromZero(50)! + 50;

    return (
      <li
        key={index}
        className="h-10 pl-4 flex items-center justify-between text-xl font-semibold rounded-md"
        style={{
          background: `linear-gradient(135deg, ${startColor} ${startPos}%, ${endColor} ${endPos}%)`,
        }}
      >
        {item}
        <Button variant="tertiary" onClick={() => handleListItemRemoval(item)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </Button>
      </li>
    );
  });

  return (
    <section className="flex flex-col gap-8 items-stretch justify-center flex-1 max-w-screen-2xl mx-auto">
      <h1>Please create your activity list.</h1>
      {!!listSet.size ? (
        <ul className="flex flex-col gap-8 items-stretch justify-center">
          {listElements}
        </ul>
      ) : null}
      <ListInput onChangeCommit={handleInputChangeCommit} />
    </section>
  );
}
