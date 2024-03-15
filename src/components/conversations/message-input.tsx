"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder: string;
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
}

export const MessageInput: FC<MessageInputProps> = ({
  placeholder,
  id,
  register,
  required,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          w-full
          rounded-full
          bg-neutral-100
          px-4
          py-2 
          font-light 
          text-black
          focus:outline-none
        "
      />
    </div>
  );
};
