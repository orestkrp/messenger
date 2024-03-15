"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}

export const DesktopItem: FC<DesktopItemProps> = ({
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
    <li onClick={handleCLick}>
      <Link
        href={href}
        onClick={handleCLick}
        className={clsx(
          `
      group
      flex
      gap-x-3
      rounded-md
      p-3
      text-sm
      font-semibold
      leading-6
      text-gray-600
      hover:bg-gray-100
      hover:text-black`,
          active && "bg-gray-100 text-black",
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
