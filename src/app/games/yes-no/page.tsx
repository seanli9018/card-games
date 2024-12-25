import { SubHeader, Card } from "@/components";
import { randomInArray } from "@/utils/randomUtil";

function CardContent({ text }: { text: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <span>{text as string}</span>
    </div>
  );
}

export default function Page() {
  const chosenItem = randomInArray(["YES", "NO"]) as string;

  const cards = Array.from({ length: 2 }).map((_, index) => {
    return (
      <li key={`${index}`} className="flex-1 w-full block">
        <Card
          content={<CardContent text={chosenItem} />}
          className="max-h-96 min-w-64 text-4xl"
        />
      </li>
    );
  });
  return (
    <>
      <SubHeader title="Yes? or No?" />
      <main className="w-full flex flex-col gap-4 items-center flex-1 pt-4 pb-8 px-16">
        <h2 className="font-semibold text-center">
          Now, it&apos;s Your Choice...
        </h2>
        <ul className="w-full flex flew-row gap-8 justify-around items-stretch flex-1 flex-wrap">
          {cards}
        </ul>
      </main>
    </>
  );
}
