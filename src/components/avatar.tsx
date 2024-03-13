"use client";
import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  userImage: string | null;
}

export const Avatar: FC<AvatarProps> = ({ userImage }) => {
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
        <Image
          src={userImage || "/img/user-placeholder.webp"}
          width={50}
          height={50}
          className="mx-auto w-auto"
          alt="user placeholder"
        />
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
