import { Tile } from "@/components";

export default function Page() {
  return (
    <div className="py-4 px-6">
      <h1>Hello, this is a card game list!</h1>
      <div className="flex flex-row gap-4">
        <Tile
          title="Yes or No?"
          description="Choose single card, and it will either tell you 'Yes' or 'No'"
          tags={["Single player", "Single device"]}
        />
        <Tile
          title="Yes or No?"
          description="Choose single card, and it will either tell you 'Yes' or 'No'"
          tags={["Single player", "Single device"]}
        />
        <Tile
          title="Yes or No?"
          description="Choose single card, and it will either tell you 'Yes' or 'No'"
          tags={["Single player", "Single device"]}
        />
      </div>
    </div>
  );
}
