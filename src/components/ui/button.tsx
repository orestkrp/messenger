"use client";

import { clsx } from "clsx";
import { FC } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
      flex
      justify-center
      rounded-md
      px-3
      py-2
      text-sm
      font-semibold
      focus-visible:outline-2
      focus-visible:outline-offset-2
      `,
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-gray-500 hover:bg-gray-600 focus-visible:outline-gray-500",
      )}
    >
      {children}
    </button>
  );
};
