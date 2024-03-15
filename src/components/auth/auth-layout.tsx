import { FC, PropsWithChildren } from "react";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-lvh flex-col justify-center bg-gray-100 px-6 py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mt-4 text-center text-xl font-bold text-gray-900">
          Sign into your account
        </h1>
      </div>
      {children}
    </div>
  );
};
