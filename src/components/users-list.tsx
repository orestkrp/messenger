"use client";

import { User } from "@prisma/client";
import { FC } from "react";
import { UserBox } from "./user-box";

interface UsersListProps {
  users: User[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <aside className="border-r border-gray-200 p-4">
      <h1 className="mb-2 text-2xl font-bold">Users</h1>
      <div className="flex flex-col">
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};
