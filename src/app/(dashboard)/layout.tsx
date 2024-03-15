import AuthContext from "@/context/auth-context";
import ToasterContext from "@/context/toaster-context";
import { Metadata } from "next";
import "../globals.css";
import { ActiveStatus } from "@/components/active-status";
import { Sidebar } from "@/components/sidebar/sidebar";

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
          <ActiveStatus />
          <Sidebar>{children}</Sidebar>
        </AuthContext>
      </body>
    </html>
  );
}
