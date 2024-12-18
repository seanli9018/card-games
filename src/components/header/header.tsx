import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-4 px-6 border-solid border-b border-slate-200 h-16">
      <nav className="flex flex-row justify-between items-center">
        <ul className="flex flex-row items-center text-lg font-semibold">
          <li key="home" className="mr-4">
            <Link href="/">
              <Image
                src="./vercel.svg"
                width={30}
                height={30}
                alt="Home"
                className="bg-slate-800"
              />
            </Link>
          </li>
          <li key="games">
            <Link href="/games">Games</Link>
          </li>
        </ul>
        <ul className="text-base font-light">
          <li key="login">
            <Link href="/">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
