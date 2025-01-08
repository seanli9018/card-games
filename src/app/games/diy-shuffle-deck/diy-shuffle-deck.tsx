"use client";

import { useState, useRef } from "react";
import {
  Card,
  SubHeader,
  ListCreator,
  NotificationHub,
  GameTransition,
  type AddNotificationCBFunction,
  type ListValueWithLinearStyle,
} from "@/components";
import { oneLinerShuffleArray } from "@/utils";
import LogoThumbnail from "../../../../public/logo_thumbnail.jpg";

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function DIYShuffleDeck() {
  const [selectedCard, setSelectedCard] = useState("");
  const [userTaskList, setUserTaskList] = useState<ListValueWithLinearStyle[]>(
    []
  );

  const addNotificationRef = useRef<AddNotificationCBFunction | null>(null);

  const handleListCreatorCommit = (taskList: ListValueWithLinearStyle[]) => {
    if (taskList.length <= 2) {
      addNotificationRef.current?.({
        title: "Notice",
        message: "At least 3 activities are needed to start.",
        imageSrc: LogoThumbnail,
      });
      return;
    }
    setUserTaskList(taskList);
  };

  const handleCardSelect = (id?: string) => {
    if (!id) return;
    setSelectedCard(id);
  };

  const cards =
    userTaskList.length >= 3 &&
    oneLinerShuffleArray(userTaskList).map((taskItem, index) => {
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
    });

  return (
    <>
      <SubHeader
        title={
          userTaskList.length < 3
            ? "Create Your Activity List"
            : "DIY Shuffle Deck"
        }
      />
      {
        //show list creator when task list is not ready.
        userTaskList.length < 3 ? (
          <>
            <section className="flex flex-col justify-center flex-1 max-w-lg w-full mx-auto px-4 md:px-6">
              <ListCreator
                commitBtnLabel="I am ready"
                onCommitBtnClick={handleListCreatorCommit}
              />
            </section>
            <NotificationHub
              timeout={5000}
              addNotification={(
                addNotificationCB: AddNotificationCBFunction
              ) => {
                addNotificationRef.current = addNotificationCB;
              }}
            />
          </>
        ) : (
          // show pick a card when task list is ready.
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
        )
      }
    </>
  );
}
