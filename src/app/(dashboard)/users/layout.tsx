import { getUsers } from "@/actions/getUsers";
import { UsersList } from "@/components/users/users-list";
import { FC, PropsWithChildren } from "react";

const UsersLayout: FC<PropsWithChildren> = async ({ children }) => {
  const users = await getUsers();
  return (
    <div className="h-full">
      <UsersList users={users} />
      {children}
    </div>
  );
};

export default UsersLayout;
