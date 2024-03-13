import { getSession } from "@/actions/getSession";
import { redirect, useRouter } from "next/navigation";
import { FC } from "react";

const Layout: FC<React.PropsWithChildren> = async ({ children }) => {
  const serverSession = await getSession();

  if (serverSession) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
