"use client";

import React, { FC } from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Avatar } from "./avatar";
import { LuLogOut } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";

interface SidebarProps {
  user: User | null;
}

export const Sidebar: FC<SidebarProps> = ({ user }) => {
  return (
    <div className="border-r border-gray-200 bg-white px-6 pb-4">
      <nav className="mt-4 flex flex-col items-center">
        <div className="cursor-pointer transition hover:opacity-75">
          <Avatar userImage={user ? user.image : null} />
        </div>
        <ul>
          <li
            role="button"
            className="flex cursor-pointer rounded-md p-2 text-gray-600 hover:text-black"
          >
            <IoSettingsSharp className="h-8 w-8 shrink-0" />
            <span className="sr-only">Settings</span>
          </li>
          <li
            role="button"
            className="flex cursor-pointer rounded-md p-2 text-gray-600 hover:text-black"
            onClick={() => {
              signOut();
            }}
          >
            <LuLogOut className="h-8 w-8 shrink-0" />
            <span className="sr-only">Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
