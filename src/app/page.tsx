import { Footer, Header } from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 items-center justify-center flex-1 max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center">
          Welcome to the card games!!!
        </h1>
        <p>
          Seems <span className="text-xl font-semibold">RANDOM</span>.
        </p>
        <p>
          But it&apos;s actually{" "}
          <span className="text-xl font-semibold">FATE</span>...
        </p>
      </main>
      <Footer />
    </>
  );
}
