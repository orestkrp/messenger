"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";

interface MobileItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}

export const MobileItem: FC<MobileItemProps> = ({
  label,
  href,
  active,
  icon: Icon,
  onClick,
}) => {
  const handleCLick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleCLick}
      className={clsx(
        `
      group
      flex
      w-full
      justify-center
      gap-x-3
      p-4
      text-sm
      font-semibold
      leading-6
      text-gray-600
      hover:bg-gray-100
      hover:text-black
      `,
        active && "bg-gray-100 text-black",
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Link>
  );
};
