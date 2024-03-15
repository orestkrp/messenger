"use client";
import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

const Login = () => {
  const onSubmit = async (data: FieldValues) => {
    signIn("credentials", { ...data, callbackUrl: "/conversations" }).then(
      (callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }
        if (callback?.ok) {
          toast.success("You are loged in");
        }
      },
    );
  };

  return (
    <AuthLayout>
      <AuthForm type="login" onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Login;
