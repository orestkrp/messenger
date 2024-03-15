"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiUsers } from "react-icons/hi";
import useConversation from "./use-conversations";
import { BiSolidConversation } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";

export const useNavItems = () => {
  const pathName = usePathname();
  const { isOpen } = useConversation();

  const navItems = [
    {
      label: "Chat",
      href: "/conversations",
      icon: BiSolidConversation,
      active: pathName === "/conversations" || isOpen,
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathName === "/users",
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => signOut(),
      icon: RiLogoutBoxRFill,
    },
  ];

  return navItems;
};
