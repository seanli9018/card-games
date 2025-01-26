import { useState, useEffect, useMemo, useRef } from 'react';

export default function useTypewriter(
  text: string,
  speed = 50,
  reverse = false,
  reversePause = 500
) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  const displayText = useMemo(() => text.slice(0, index), [index, text]);

  const delayedSetInterval = (
    callback: () => void,
    interval: number,
    delay: number
  ) => {
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(callback, interval);
    }, delay);

    return { timeoutId, intervalId }; // Return the timeout ID in case you need to clear the delay
  };

  useEffect(() => {
    if (text.length <= 0) return;

    const intervalId = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearTimeout(intervalId);

        // once reaching the last character, and reverse enabled, start moving backwards.
        if (reverse) {
          const { intervalId: reverseIntervalId } = delayedSetInterval(
            () => {
              if (indexRef.current <= 0) {
                clearInterval(reverseIntervalId);
                return;
              }
              indexRef.current -= 1;
              setIndex(indexRef.current);
            },
            speed,
            reversePause
          );
        }

        return;
      }

      // moving forward
      indexRef.current += 1;
      setIndex(indexRef.current);
    }, speed);

    return () => {
      clearTimeout(intervalId);
    };
  }, [text, speed, reverse, reversePause]);

  return { displayText, index };
}
