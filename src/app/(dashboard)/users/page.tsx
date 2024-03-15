import { EmptyState } from "@/components/empty-state";
import { FC } from "react";

const Users: FC = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default Users;
