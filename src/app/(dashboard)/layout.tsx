import { UsersList } from "@/components/users-list";
import { getUsers } from "@/actions/getUsers";
import { Sidebar } from "@/components/sidebar";
import AuthContext from "@/context/auth-context";
import ToasterContext from "@/context/toaster-context";
import { Metadata } from "next";
import "../globals.css";
import { Layout } from "@/components/layout";
import { getSession } from "@/actions/getSession";
import getCurrentUser from "@/actions/get-current-user";

export const metadata: Metadata = {
  title: "Messenger",
  description: "Simple message app",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <Layout>
            <Sidebar user={currentUser} />
            <UsersList users={users} />
            <div>{children}</div>
          </Layout>
        </AuthContext>
      </body>
    </html>
  );
}
