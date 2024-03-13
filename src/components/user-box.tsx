"use client";

import { User } from "@prisma/client";
import { FC } from "react";
import { Avatar } from "./avatar";

interface UserBoxProps {
  user: User;
}

export const UserBox: FC<UserBoxProps> = ({ user }) => {
  return (
    <div className="flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100">
      <Avatar userImage={user.image} />
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
      </div>
    </div>
  );
};
