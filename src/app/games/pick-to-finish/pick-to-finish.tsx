"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  SubHeader,
  ListCreator,
  NotificationHub,
  GameTransition,
  StepProgress,
  type AddNotificationCBFunction,
  type ListValueWithLinearStyle,
} from "@/components";
import { useBreakpointRange } from "@/hooks";
import { oneLinerShuffleArray } from "@/utils";
import LogoThumbnail from "../../../../public/logo_thumbnail.jpg";

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function PickToFinish() {
  const [selectedCard, setSelectedCard] = useState("");
  const [userTaskList, setUserTaskList] = useState<ListValueWithLinearStyle[]>(
    []
  );
  const [subHeaderHeight, setSubHeaderHeight] = useState(0);
  const isMdAndAbove = useBreakpointRange("md");

  const addNotificationRef = useRef<AddNotificationCBFunction | null>(null);

  const handleListItemCommit = (taskList: ListValueWithLinearStyle[]) => {
    setUserTaskList(taskList);
  };

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const handleForward = (currentStep: number) => {
    switch (currentStep) {
      case 1: {
        if (userTaskList.length < 2) {
          addNotificationRef.current?.({
            title: "Warning",
            message: "At least 2 activities are needed to start.",
            imageSrc: LogoThumbnail,
          });
          // prevent moving forward.
          return false;
        }
        // validated and allow moving forward.
        return true;
      }
      case 2:
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  // get header height.
  useEffect(() => {
    const subHeaderDOM = document.getElementById("yc-game-sub-header");
    if (!subHeaderDOM) return;

    setSubHeaderHeight(subHeaderDOM.offsetHeight);
  }, []);

  const cards =
    userTaskList?.length >= 2
      ? oneLinerShuffleArray(userTaskList).map((taskItem, index) => {
          const displayStyle =
            selectedCard && selectedCard !== `card-${index}` ? "none" : "block";
          return (
            <li
              key={`${index}-${taskItem.value}`}
              className="flex-1 w-full block"
              style={{
                display: displayStyle,
              }}
            >
              <Card
                id={`card-${index}`}
                content={<CardContent text={taskItem.value} />}
                className="md:max-h-96 md:min-w-64 max-h-64 min-w-48 text-xl"
                onSelectCommit={handleCardSelect}
              />
            </li>
          );
        })
      : null;

  return (
    <>
      <SubHeader title="Pick to Finish" />
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
          { label: "How many cards to generate?" },
          { label: "Ready to start?" },
        ]}
        className="p-4"
        style={{ height: `calc(100vh - ${subHeaderHeight}px)` }}
        direction={isMdAndAbove ? "horizontal" : "vertical"}
        onForward={handleForward}
      />
      <NotificationHub
        timeout={5000}
        variant="warn"
        className="top-28"
        addNotification={(addNotificationCB: AddNotificationCBFunction) => {
          addNotificationRef.current = addNotificationCB;
        }}
      />
      {/*  
        <GameTransition
          intro="Shuffling..."
          introDelay={4}
          reverse
          totalCountdown={3}
        >
          <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
            {!selectedCard ? (
              <h2 className="font-semibold text-center">
                Now, it&apos;s Your Choice...
              </h2>
            ) : null}
            <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
              {cards}
          </ul>
          </main>
        </GameTransition>
      */}
    </>
  );
}
