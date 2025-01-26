'use client';

import { useSpring, animated } from '@react-spring/web';
import { useTypewriter } from '@/hooks';
import { TypingProps } from './typing.type';

export default function Typing({
  text,
  speed = 80,
  reverse = false,
  reversePause = 1000,
  fadeInOut = false,
  fadeDelay = 500,
}: TypingProps) {
  const { displayText, index } = useTypewriter(
    text,
    speed,
    reverse,
    reversePause
  );

  // Define the typing fade-in and fade-out animation
  const containerStyle = useSpring({
    from: {
      opacity: 0,
      pointerEvent: 'none',
    },
    to: {
      opacity:
        (reverse && index === 0) || (!reverse && index >= text.length - 1)
          ? 0
          : 1,
      pointerEvent:
        (reverse && index === 0) || (!reverse && index >= text.length - 1)
          ? 'none'
          : 'auto',
    },
    config: { duration: fadeDelay }, // Adjust duration for fade speed
  });

  const blinkCursorStyle = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    loop: { reverse: true },
    config: { duration: 300 }, // Adjust blinking speed (in ms)
  });

  return (
    <animated.div style={fadeInOut ? containerStyle : undefined}>
      <span>{displayText}</span>
      <animated.span style={blinkCursorStyle}>|</animated.span>
    </animated.div>
  );
}
