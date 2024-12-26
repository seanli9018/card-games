"use client";

import { useState, useEffect, useRef, isValidElement } from "react";
import Typing from "../typing";
import type { GameTransitionProps } from "./gameTransition.type";

export default function GameTransition({
  intro,
  introDelay = 10,
  totalCountdown = 0,
}: GameTransitionProps) {
  const [countdown, setCountdown] = useState(totalCountdown);
  const [introTimeLeft, setIntroTimeLeft] = useState(introDelay);
  const countdownRef = useRef(totalCountdown);
  const introTimeLeftRef = useRef(introDelay);
  const isInVisible = introTimeLeft <= 0 && countdown <= 0;

  // Start with displaying intro text/content first.
  useEffect(() => {
    if (introTimeLeftRef.current <= 0) return;

    const intervalId = setInterval(() => {
      if (introTimeLeftRef.current <= 0) {
        clearInterval(intervalId);
        return;
      }

      introTimeLeftRef.current -= 1;
      setIntroTimeLeft(introTimeLeftRef.current);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Following with countdown once intro is completed.
  useEffect(() => {
    // only after intro is done.
    if (introTimeLeft > 0 || countdownRef.current <= 0) return;

    const intervalId = setInterval(() => {
      if (countdownRef.current <= 0) {
        clearInterval(intervalId);
        return;
      }

      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [introTimeLeft]);

  let introElement;
  if (isValidElement(intro)) {
    introElement = intro;
  }

  if (typeof intro === "string") {
    introElement = (
      <div className="text-4xl font-bold">
        <Typing text={intro} fadeInOut reverse />
      </div>
    );
  }

  // Hide game transition when both intro and countdown complete.
  if (isInVisible) return null;

  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-8">
      {introTimeLeft > 0 ? <>{introElement}</> : null}
      {introTimeLeft <= 0 && countdown > 0 ? (
        <span className="text-8xl font-bold">{countdown}</span>
      ) : null}
    </div>
  );
}
