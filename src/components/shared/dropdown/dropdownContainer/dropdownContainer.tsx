'use client';
import { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import type { DropdownContainerProps } from './dropdownContainer.type';
import clsx from 'clsx';

export default function DropdownContainer({
  open = false,
  children,
  content,
  position = 'center',
  onClose,
}: DropdownContainerProps) {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const containerStyle = useSpring({
    from: {
      opacity: open ? 0 : 1,
    },
    to: {
      opacity: open ? 1 : 0,
    },
    config: { duration: 400 }, // Adjust duration for fade speed
  });

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current && // Ensure ref exists
        !dropdownContainerRef.current.contains(event.target as Node) // Check if click is outside
      ) {
        if (onClose) onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const dropdownContainerStyle = clsx(
    'absolute mt-4 p-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
    {
      'left-1/2 -translate-x-1/2': position === 'center',
      'left-0': position === 'left',
      'right-0': position === 'right',
    }
  );

  return (
    <div className="relative" ref={dropdownContainerRef}>
      {children}
      {open ? (
        <animated.div style={containerStyle} className={dropdownContainerStyle}>
          {content}
        </animated.div>
      ) : null}
    </div>
  );
}
