"use client";

import { useUser } from "@/hooks/use-user";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { FC, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Avatar } from "../ui/avatar";
import { ProfileDrawer } from "./profile-drawer";
import { GroupAvatar } from "../ui/group-avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useUser(conversation);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const statusText = conversation.isGroup
    ? `${conversation.users.length} members`
    : "Active";

  return (
    <div
      className="
        flex
        w-full
        items-center
        justify-between
        border-b-[1px]
        bg-white
        px-4
        py-3
        shadow-sm
        sm:px-4
        lg:px-6
        "
    >
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="
            block 
            cursor-pointer 
            text-gray-600 
            transition 
            hover:opacity-75
            lg:hidden
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <GroupAvatar users={conversation.users} />
        ) : (
          <Avatar userImage={otherUser.image} />
        )}
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => setIsDrawerOpen(true)}
        className="
          cursor-pointer
          text-gray-600
          transition
          hover:opacity-75
        "
      />
      <ProfileDrawer
        conversation={conversation}
        onClose={() => setIsDrawerOpen(false)}
        isOpen={isDrawerOpen}
      />
    </div>
  );
};
