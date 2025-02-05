export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center min-h-16">
      <p className="text-xs">Copyright © {currentYear}</p>
    </footer>
  );
}
