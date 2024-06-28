import AuthContext from "@/context/auth-context";
import ToasterContext from "@/context/toaster-context";
import { Metadata } from "next";
import "../globals.css";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Simple message app",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverSession = await getSession();

  if (serverSession) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
