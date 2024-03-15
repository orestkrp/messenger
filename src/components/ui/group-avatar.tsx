import { User } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";

interface GroupAvatarProps {
  users: User[];
}

export const GroupAvatar: FC<GroupAvatarProps> = ({ users }) => {
  const firstThreeUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {firstThreeUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image
            alt="avatar"
            fill
            src={user.image || "/img/user-placeholder.webp"}
          />
        </div>
      ))}
    </div>
  );
};
