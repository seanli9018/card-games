"use client";

import { useState } from "react";
import { useUser } from "@/store/user";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "../shared";
import LogoThumbnail from "../../../public/logo_thumbnail.jpg";

export default function Header() {
  const [openUserDropdown, setUserDropdown] = useState(false);
  const { user, isLoggedIn } = useUser();

  const handleProfileClick = () => {
    setUserDropdown((prev: boolean) => !prev);
  };

  const dropdownLinks = [
    [
      {
        label: "Profile",
        href: "#",
      },
      {
        label: "Settings",
        href: "#",
      },
    ],
    [
      {
        label: "Game Settings",
        href: "#",
      },
      {
        label: "Try Premium",
        href: "#",
      },
    ],
  ];

  return (
    <header className="py-4 px-6 border-solid border-b border-slate-200 h-16">
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
        {!isLoggedIn ? (
          <ul className="text-base font-light">
            <li key="login">
              <Link href="/user-auth">Login</Link>
            </li>
          </ul>
        ) : (
          <Image
            src={LogoThumbnail}
            width={30}
            height={30}
            alt="Profile"
            className="relative bg-slate-800 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
        )}
      </nav>
      <Dropdown
        open={openUserDropdown}
        linkGroups={dropdownLinks}
        user={user}
      />
    </header>
  );
}
