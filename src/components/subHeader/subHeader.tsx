import Link from "next/link";
import HeaderProfile from "../headerProfile";
import type { SubHeaderProps } from "./subHeader.type";

export default function SubHeader({ title }: SubHeaderProps) {
  return (
    <header
      id="yc-game-sub-header"
      className="py-4 px-6 border-solid border-b border-slate-200 h-16 flex items-center"
    >
      <nav className="flex flex-row justify-between items-center flex-1">
        <ul className="flex flex-row items-center">
          <li key="back-icon" className="mr-4">
            <Link href="/games">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ul>
        {title ? (
          <h1 className="flex-1 text-center text-sm font-extrabold">{title}</h1>
        ) : null}
        <HeaderProfile />
      </nav>
    </header>
  );
}
