import AuthContext from "@/context/auth-context";
import ToasterContext from "@/context/toaster-context";
import { Metadata } from "next";
import "../globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Simple message app",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
