"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC, useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: FieldValues) => Promise<void>;
}

export const AuthForm: FC<AuthFormProps> = ({ type, onSubmit }) => {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setIsSubmiting(true);
        onSubmit(data).then(() => {
          setIsSubmiting(false);
        });
      })}
    >
      {type === "register" && (
        <Input
          label="Name"
          name="name"
          type="text"
          required
          register={register}
        />
      )}
      <Input
        label="Email"
        name="email"
        type="text"
        required
        register={register}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        register={register}
      />
      <Button disabled={isSubmiting} type="submit">
        {type === "register" ? "Register" : "Log in"}
      </Button>
    </form>
  );
};
