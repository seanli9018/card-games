"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser, LOGOUT_USER } from "@/store/user";
import { LinkListDropdown } from "../shared";
import DefaultAvatar from "../../../public/default_avatar_1.png";

function LogoutButton() {
  const { dispatch } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // logout user.
    dispatch({ type: LOGOUT_USER });
    // redirect to home page.
    router.replace("/");

    return;
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left block pl-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600"
    >
      Logout
    </button>
  );
}

export default function HeaderProfile() {
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
        label: "Try Premium",
        href: "#",
      },
      {
        label: "Game Settings",
        href: "#",
      },
    ],
    [<LogoutButton key="logout-button" />],
  ];

  return (
    <>
      {!isLoggedIn ? (
        <ul className="text-base font-light">
          <li key="login">
            <Link href="/user-auth/login">Login</Link>
          </li>
        </ul>
      ) : (
        <LinkListDropdown
          open={openUserDropdown}
          title={`Hi, ${user?.username}`}
          linkGroups={dropdownLinks}
          position="right"
          onClose={() => setUserDropdown(false)}
        >
          <button onClick={handleProfileClick}>
            <Image
              src={DefaultAvatar}
              width={30}
              height={30}
              alt="Profile"
              className="relative bg-slate-800 rounded-full cursor-pointer"
            />
          </button>
        </LinkListDropdown>
      )}
    </>
  );
}
