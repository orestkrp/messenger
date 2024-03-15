"use client";
import useActiveList from "@/context/use-active-list";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  user: User | null;
}

export const Avatar: FC<AvatarProps> = ({ user }) => {
  const session = useSession();
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div
        className="
        iniline-block 
        relative 
        h-14
        w-14 
        overflow-hidden 
        rounded-full"
      >
        <div>
          <Image
            src={
              session.status === "authenticated"
                ? user?.image || "/img/user-placeholder.webp"
                : "/img/user-placeholder.webp"
            }
            width={50}
            height={50}
            className="mx-auto w-auto"
            alt="user placeholder"
          />
        </div>
      </div>
      {isActive && (
        <span
          className="
        absolute
        right-0
        top-0
        block
        h-3
        w-3
        rounded-full
        bg-green-500
        ring-2 
        ring-white
        "
        />
      )}
    </div>
  );
};
