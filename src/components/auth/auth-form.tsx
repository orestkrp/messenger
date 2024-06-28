"use client";
import { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

interface AuthFormProps {
  type: "register" | "login";
  onSubmit: (data: FieldValues) => Promise<void>;
}

export const AuthForm: FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <div className="rounded-lg bg-white px-4 py-8 shadow">
        <form
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);
            onSubmit(data).finally(() => {
              setIsLoading(false);
            });
          })}
        >
          <div className="space-y-6">
            {type == "register" && (
              <Input
                label="Name"
                register={register}
                required
                type="text"
                id="name"
                errors={errors}
              />
            )}
            <Input
              label="Email"
              register={register}
              required
              type="text"
              id="email"
              errors={errors}
            />
            <Input
              label="Password"
              register={register}
              required
              type="password"
              id="password"
              errors={errors}
            />
            <Button type="submit" disabled={isLoading} fullWidth>
              {type === "login" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-4 flex justify-center text-sm text-gray-500">
          <p className="flex gap-1">
            <span>
              {type === "login"
                ? "New to Messenger?"
                : "Already have an account?"}
            </span>
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="hover:underline"
            >
              {type === "login" ? "Create an account" : "Login?"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
