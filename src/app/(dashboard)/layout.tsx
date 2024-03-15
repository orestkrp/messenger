import AuthContext from "@/context/auth-context";
import ToasterContext from "@/context/toaster-context";
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Simple message app",
};

export default async function DashboardLayout({
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
