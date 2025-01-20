import Link from "next/link";
import Image from "next/image";
import HeaderProfile from "../headerProfile";
import LogoThumbnail from "../../../public/logo_thumbnail.jpg";

export default function Header() {
  return (
    <header
      id="yc-game-header"
      className="py-4 px-6 border-solid border-b border-slate-200 h-16"
    >
      <nav className="flex flex-row justify-between items-center">
        <ul className="flex flex-row items-center text-lg font-semibold">
          <li key="home" className="mr-4">
            <Link href="/">
              <Image
                src={LogoThumbnail}
                width={30}
                height={30}
                alt="Home"
                className="bg-slate-800 rounded-full"
              />
            </Link>
          </li>
          <li key="games">
            <Link href="/games">Games</Link>
          </li>
        </ul>
        <HeaderProfile />
      </nav>
    </header>
  );
}
