"use client";

import { FC, useState } from "react";
import { User } from "@prisma/client";
import { useNavItems } from "@/hooks/use-nav-items";
import { Avatar } from "../ui/avatar";
import { DesktopItem } from "./desktop-item";
import SettingsModal from "./settings-modal";

interface DesktopSidebarProps {
  currentUser: User | null;
}

export const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const navItems = useNavItems();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r lg:bg-white lg:pb-4 xl:px-6">
        <nav className="mt-4 flex flex-col justify-between">
          <ul className="flex flex-col items-center space-y-1">
            {navItems.map((route) => (
              <DesktopItem
                key={route.label}
                href={route.href}
                icon={route.icon}
                label={route.label}
                active={route.active}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col items-center justify-between">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition hover:opacity-75"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};
