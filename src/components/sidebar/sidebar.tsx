import { getCurrentUser } from "@/actions/get-current-user";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileFooter } from "./mobile-footer";

export const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="h-lvh lg:pl-20">{children}</main>
    </div>
  );
};
