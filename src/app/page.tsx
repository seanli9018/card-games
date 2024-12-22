"use client";

import { useState, useEffect } from "react";
import { Footer, Header, Button } from "@/components";
import { Trail } from "@/components/shared";

export default function Home() {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setAnimateText(true);
  }, []);

  const onMouseHandler = (evt: React.MouseEvent) => {
    if (evt?.type === "mouseenter") {
      setAnimateText(false);
    }

    if (evt?.type === "mouseleave") {
      setAnimateText(true);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 justify-center flex-1 max-w-screen-2xl mx-auto">
        <h1 className="text-xl">
          Welcome to <span className="text-xl font-semibold">YC</span> Card
          games.
        </h1>
        <div onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
          <Trail open={animateText}>
            <span className="text-8xl">It seems</span>
            <span className="text-8xl font-semibold">RANDOM</span>
          </Trail>
          <Trail open={!animateText}>
            <span className="text-8xl">But it&apos;s</span>
            <span className="text-8xl font-semibold">FATE...</span>
          </Trail>
        </div>
        <Button
          size="regular"
          variant="secondary"
          color="monochromatic"
          href="/games"
          buttonType="link"
        >
          Explore...
        </Button>
      </main>
      <Footer />
    </>
  );
}
