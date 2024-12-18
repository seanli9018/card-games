"use client";
import { Tile } from "@/components";

export default function Page() {
  return (
    <div className="py-4 px-6 w-full">
      <h1>Hello, this is a card game list!</h1>
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Tile
          title="Yes or No?"
          description="Choose single card, and it will either tell you 'Yes' or 'No'"
          tags={["Single player", "Single device"]}
          cta={{ children: "play", href: "/games/yes-no", buttonType: "link" }}
        />
        <Tile
          title="Yes or No? Yes or No? Yes or No? Yes or No? Yes or No?"
          description="Choose single card, and it will either tell you 'Yes' or 'No' Choose single card, and it will either tell you 'Yes' or 'No' Choose single card, and it will either tell you 'Yes' or 'No'"
          tags={["Single player", "Single device"]}
          cta={{ children: "play", onClick: () => console.log("clicked") }}
        />
      </div>
    </div>
  );
}
