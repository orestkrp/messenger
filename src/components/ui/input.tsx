"use client";

import clsx from "clsx";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  required?: boolean;
  label?: string;
  register: UseFormRegister<FieldValues>;
}

export const Input: FC<InputProps> = ({
  name,
  register,
  required,
  className,
  label,
  ...props
}) => {
  return (
    <div className={className}>
      {label && <label className="block" htmlFor={name}>{label}</label>}
      <input className="form-input" id={name} {...props} {...register(name, {required})}></input>
    </div>
  );
};
