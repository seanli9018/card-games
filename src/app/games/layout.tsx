export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-8 items-center justify-stretch flex-1 max-w-screen-2xl mx-auto">
      {children}
    </main>
  );
}
