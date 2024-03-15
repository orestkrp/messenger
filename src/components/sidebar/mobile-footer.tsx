"use client";
import { FC } from "react";
import { useNavItems } from "@/hooks/use-nav-items";
import useConversation from "@/hooks/use-conversations";
import { MobileItem } from "./mobile-item";

export const MobileFooter: FC = () => {
  const navItems = useNavItems();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
      {navItems.map((navItem) => (
        <MobileItem
          key={navItem.label}
          href={navItem.href}
          icon={navItem.icon}
          label={navItem.label}
          active={navItem.active}
          onClick={navItem.onClick}
        />
      ))}
    </div>
  );
};
