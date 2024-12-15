import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li key="home">
            <Link href="/">Home</Link>
          </li>
          <li key="single-player">
            <Link href="/single-player">Single Player</Link>
          </li>
          <li key="multiple-players">
            <Link href="/multiple-players">Multiple Players</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
