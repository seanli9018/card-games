import { SubHeader } from "@/components";
import ListCreator from "@/components/listCreator";

export default function Page() {
  return (
    <>
      <SubHeader title="Create Your Activity List" />
      <section className="flex flex-col justify-center flex-1 max-w-lg w-full mx-auto px-2 md:px-4">
        <ListCreator />
      </section>
      {/* <DIYShuffleDeck /> */}
    </>
  );
}
