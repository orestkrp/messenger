"use client";
import { AuthForm } from "@/components/auth-form";
import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const onSubmit = async (data: FieldValues) => {
    signIn("credentials", { ...data, callbackUrl: "/" }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials!");
      }
      if (callback?.ok) {
        toast.success("You are loged in");
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <AuthForm type="login" onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
