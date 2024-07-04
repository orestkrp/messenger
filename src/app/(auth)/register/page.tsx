"use client";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    axios
      .post("/api/register", data)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        toast.error("Somehing went wrong!");
      });
  };

  return (
    <AuthLayout>
      <AuthForm type="register" onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Register;
