"use client";

import { useState, useMemo, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import Notification from "./notification";
import {
  NotificationHubProps,
  NotificationItemData,
} from "./notificationHub.type";
let id = 0;
export default function NotificationHub({
  timeout = 3000,
  addNotification,
}: NotificationHubProps) {
  const [notificationList, setNotificationList] = useState<
    NotificationItemData[]
  >([]);
  // init map data for storing notification div elements.
  const notificationRefMap = useMemo(() => new Map(), []);
  // init weak map data for storing cancelled notification div elements as key, cancel fn as value.
  const notificationCancelMap = useMemo(() => new WeakMap(), []);

  const transitions = useTransition(notificationList, {
    from: {
      opacity: 0,
      right: -300,
      top: (item: NotificationItemData) =>
        !notificationRefMap?.size
          ? 20
          : notificationRefMap.size *
              (notificationRefMap?.get(item).offsetHeight + 10) +
            20,
      life: "100%",
    },
    keys: (item) => item.key,
    enter: (item) => async (next, cancel) => {
      notificationCancelMap.set(item, cancel);
      await next({
        opacity: 1,
        right: 10,
        top:
          notificationRefMap?.size *
            (notificationRefMap?.get(item).offsetHeight + 10) +
          20,
      });
      await next({ life: "0%" });
    },
    leave: [{ opacity: 0 }, { right: -300 }],
    onStart: (item) => {
      notificationRefMap.delete(item);
    },
    onRest: (result, ctrl, item) => {
      notificationRefMap.delete(item);
      setNotificationList((prevList) =>
        prevList.filter((i) => {
          return i.key !== item.key;
        })
      );
    },
    config: (item, index, phase) => (key) =>
      phase === "enter" && key === "life"
        ? { duration: timeout }
        : { tension: 125, friction: 20, precision: 0.1 },
  });

  useEffect(() => {
    if (!addNotification) return;

    addNotification(({ title, message, imageSrc }) => {
      setNotificationList((prevList) => [
        ...prevList,
        { key: id++, title, message, imageSrc },
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return transitions(({ life, ...style }, item) => (
    <animated.div
      className="fixed top-20 right-5 z-50"
      ref={(element: HTMLDivElement) => {
        if (element) notificationRefMap.set(item, element);
      }}
      style={style}
    >
      <Notification
        title={item.title}
        message={item.message}
        imageSrc={item.imageSrc}
        onClose={() => {
          if (notificationCancelMap.has(item) && life.get() !== "0%")
            notificationCancelMap.get(item)();
        }}
      />
      <animated.div
        style={{
          right: life,
          backgroundImage: "linear-gradient(130deg, #00b4e6, #00f0e0)",
        }}
        className="absolute bottom-px left-0 h-1 rounded-b-md mx-px"
      ></animated.div>
    </animated.div>
  ));
}
