'use client';

import { useState, useEffect } from 'react';
import { Footer, Header, Button } from '@/components';
import { Trail } from '@/components/shared';
import { useBreakpointRange } from '@/hooks';

export default function Home() {
  const [animateText, setAnimateText] = useState(false);
  const isMdAndAbove = useBreakpointRange('md');

  useEffect(() => {
    setAnimateText(true);
  }, []);

  const onMouseOnlyHandler = (evt: React.PointerEvent) => {
    if (evt?.type === 'pointerenter' && evt?.pointerType !== 'touch') {
      setAnimateText(false);
    }

    if (evt?.type === 'pointerleave' && evt?.pointerType !== 'touch') {
      setAnimateText(true);
    }
  };

  const handleTouchToggle = () => {
    setAnimateText(!animateText);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center flex-1 w-full max-w-screen-2xl mx-auto p-6 overflow-hidden">
        <div>
          <h1 className="text-xl">
            Welcome to <span className="text-xl font-semibold">YC</span> Card
            games.
          </h1>
          <div
            onPointerEnter={onMouseOnlyHandler}
            onPointerLeave={onMouseOnlyHandler}
            onTouchStart={handleTouchToggle}
            className="my-6"
          >
            <Trail open={animateText} itemHeight={isMdAndAbove ? 120 : 50}>
              <span className="text-4xl md:text-8xl">It seems</span>
              <span className="text-4xl md:text-8xl font-semibold">RANDOM</span>
            </Trail>
            <Trail open={!animateText} itemHeight={isMdAndAbove ? 120 : 50}>
              <span className="text-4xl md:text-8xl">But it&apos;s</span>
              <span className="text-4xl md:text-8xl font-semibold">
                FATE...
              </span>
            </Trail>
          </div>
          <Button
            size="regular"
            variant="primary"
            color="monochromatic"
            href="/games"
            buttonType="link"
          >
            Explore...
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
