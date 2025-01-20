"use client";

import { useState, useRef, useEffect } from "react";
import {
  SubHeader,
  ListCreator,
  Input,
  NotificationHub,
  StepProgress,
  type AddNotificationCBFunction,
  type ListValueWithLinearStyle,
} from "@/components";
import { useBreakpointRange } from "@/hooks";
import LogoThumbnail from "../../../../public/logo_thumbnail.jpg";

export default function GamePrepare() {
  const [userTaskList, setUserTaskList] = useState<ListValueWithLinearStyle[]>(
    []
  );
  const [cardCount, setCardCount] = useState(0);
  const [cardCountError, setCardCountError] = useState("");
  const [subHeaderHeight, setSubHeaderHeight] = useState(0);
  const [isGameReady, setIsGameReady] = useState(false);
  const isMdAndAbove = useBreakpointRange("md");

  const addNotificationRef = useRef<AddNotificationCBFunction | null>(null);

  const handleListItemCommit = (taskList: ListValueWithLinearStyle[]) => {
    setUserTaskList(taskList);
  };

  const handleForward = (currentStep: number) => {
    switch (currentStep) {
      case 1: {
        if (userTaskList.length < 2) {
          addNotificationRef.current?.({
            title: "Warning",
            message: "At least 2 activities are needed to move forward.",
            imageSrc: LogoThumbnail,
          });
          // prevent moving forward.
          return false;
        }
        // validated and allow moving forward.
        return true;
      }
      case 2: {
        if (cardCount <= 0 || cardCount > 20) {
          addNotificationRef.current?.({
            title: "Warning",
            message: "Between 1 and 20 cards are allowed.",
            imageSrc: LogoThumbnail,
          });
          // prevent moving forward.
          return false;
        }
        // validated and allow moving forward.
        return true;
      }
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleFinalStep = () => {
    setIsGameReady(true);
  };

  const handleValueValidation = (value: string) => {
    const inputRegExp = /^\d*$/;
    const isInputNumber = inputRegExp.test(value);

    if (!isInputNumber) {
      setCardCountError("Enter a number between 1 - 20.");
      return false;
    }

    if (isInputNumber) {
      setCardCountError("");
    }

    return true;
  };

  const handleCardCountInputChange = (value: string) => {
    if (isNaN(Number(value))) return;
    setCardCount(Number(value));
  };

  // get header height.
  useEffect(() => {
    const subHeaderDOM = document.getElementById("yc-game-sub-header");
    if (!subHeaderDOM) return;

    setSubHeaderHeight(subHeaderDOM.offsetHeight);
  }, []);

  // set default card to generate to the length of task list created by user.
  useEffect(() => {
    if (!userTaskList.length) return;
    setCardCount(userTaskList.length);
  }, [userTaskList]);

  // render game preparation.
  return (
    <>
      <SubHeader title="Pick to Finish" />
      {!isGameReady ? (
        <>
          <StepProgress
            steps={[
              {
                label: "Create your own list",
                children: (
                  <section className="flex flex-col justify-center flex-1 max-w-lg w-full mx-auto px-2">
                    <ListCreator
                      header="Please create your activity list."
                      defaultTaskList={userTaskList}
                      onListItemCommit={handleListItemCommit}
                    />
                  </section>
                ),
              },
              {
                label: "How many cards to generate?",
                children: (
                  <section className="flex flex-col justify-center flex-1 max-w-2xl w-full mx-auto px-2">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-2">
                      <h2 className="text-md text-center font-semibold">
                        How many cards do you want to generate?
                      </h2>
                      <Input
                        leadingIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                            />
                          </svg>
                        }
                        defaultValue={cardCount ? cardCount.toString() : ""}
                        onChange={handleCardCountInputChange}
                        valueValidator={handleValueValidation}
                        error={cardCountError}
                        className="min-w-0"
                      />
                    </div>
                  </section>
                ),
              },
              {
                label: "Ready to start?",
                children: (
                  <section className="flex flex-col justify-center gap-4 max-w-md mx-auto px-2">
                    <h2 className="text-xl font-semibold">Ready to start?</h2>
                    <div>
                      <p>Total number of activities: {userTaskList.length}</p>
                      <p>Total number of cards: {cardCount}</p>
                    </div>
                  </section>
                ),
              },
            ]}
            className="p-4"
            style={{ height: `calc(100vh - ${subHeaderHeight}px)` }}
            direction={isMdAndAbove ? "horizontal" : "vertical"}
            onForward={handleForward}
            onFinalStep={handleFinalStep}
          />
          <NotificationHub
            timeout={5000}
            variant="warn"
            className="top-28"
            addNotification={(addNotificationCB: AddNotificationCBFunction) => {
              addNotificationRef.current = addNotificationCB;
            }}
          />
        </>
      ) : (
        <>Mock Game</>
      )}
    </>
  );
}
