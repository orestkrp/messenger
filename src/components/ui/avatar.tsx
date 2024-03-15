"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  userImage: string | null;
}

export const Avatar: FC<AvatarProps> = ({ userImage }) => {
  const session = useSession();
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
                ? userImage || "/img/user-placeholder.webp"
                : "/img/user-placeholder.webp"
            }
            width={50}
            height={50}
            className="mx-auto w-auto"
            alt="user placeholder"
          />
        </div>
      </div>
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
    </div>
  );
};
