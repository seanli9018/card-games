"use client";

import { useState, useMemo, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import clsx from "clsx";
import Notification from "./notification";
import {
  NotificationHubProps,
  NotificationItemData,
} from "./notificationHub.type";

let id = 0;
export default function NotificationHub({
  timeout = 3000,
  variant = "info",
  addNotification,
  ...restProps
}: NotificationHubProps) {
  const [notificationList, setNotificationList] = useState<
    NotificationItemData[]
  >([]);
  // init map data for storing notification div elements.
  const notificationRefMap = useMemo(() => new WeakMap(), []);
  // init weak map data for storing cancelled notification div elements as key, cancel fn as value.
  const notificationCancelMap = useMemo(() => new WeakMap(), []);

  const notificationHubContainerStyle = clsx(
    "fixed top-14 right-5 z-50",
    restProps.className
  );

  const linearGradientStyle =
    variant === "warn"
      ? "linear-gradient(130deg, #ca8a04, #facc15)"
      : variant === "error"
      ? "linear-gradient(130deg, #dc2626, #f87171)"
      : "linear-gradient(130deg, #00b4e6, #00f0e0)";

  const transitions = useTransition(notificationList, {
    from: {
      opacity: 0,
      right: -300,
      life: "100%",
    },
    keys: (item) => item.key,
    enter: (item) => async (next, cancel) => {
      notificationCancelMap.set(item, cancel);
      await next({
        opacity: 1,
        right: 0,
      });
      await next({ life: "0%" });
    },
    leave: (item) => ({
      right: -(notificationRefMap.get(item).offsetWidth + 20),
      opacity: 0,
    }),
    onRest: (result, ctrl, item) => {
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

  return (
    <div {...restProps} className={notificationHubContainerStyle}>
      {transitions(({ life, ...style }, item) => (
        <animated.div
          className="relative mt-4"
          ref={(element: HTMLDivElement) => {
            if (element) notificationRefMap.set(item, element);
          }}
          style={style}
        >
          <Notification
            title={item.title}
            message={item.message}
            imageSrc={item.imageSrc}
            variant={variant}
            onClose={() => {
              if (notificationCancelMap.has(item) && life.get() !== "0%")
                notificationCancelMap.get(item)();
            }}
          />
          <animated.div
            style={{
              right: life,
              backgroundImage: `${linearGradientStyle}`,
            }}
            className="absolute bottom-px left-0 h-1 rounded-b-md mx-px"
          ></animated.div>
        </animated.div>
      ))}
    </div>
  );
}
