"use client";
import { AuthForm } from "@/components/auth-form";
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
        router.push("/login");
      })
      .catch(() => {
        toast.error("Somehing went wrong!");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <AuthForm type="register" onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
