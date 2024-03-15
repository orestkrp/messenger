"use client";

import { FC } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { clsx } from "clsx";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        autoComplete={id}
        type={type}
        {...register(id, { required })}
        className={clsx(
          `form-input
          block 
          w-full 
          rounded-md 
          border-0 
          py-1.5 
          text-gray-900
          shadow-sm 
          ring-1 
          ring-inset
        ring-gray-300
        placeholder:text-gray-400
          focus:ring-gray-600
          sm:text-sm
          sm:leading-6`,
          errors[id] && "ring-rose-500 focus:ring-rose-500",
          disabled && "cursor-default opacity-50",
        )}
      />
    </div>
  );
};
