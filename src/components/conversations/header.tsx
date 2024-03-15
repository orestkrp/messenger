"use client";

import { useUser } from "@/hooks/use-user";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Avatar } from "../ui/avatar";
import { ProfileDrawer } from "./profile-drawer";
import { GroupAvatar } from "../ui/group-avatar";
import useActiveList from "@/context/use-active-list";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useUser(conversation);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation.isGroup, conversation.users.length, isActive]);

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
          <Avatar user={otherUser} />
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
