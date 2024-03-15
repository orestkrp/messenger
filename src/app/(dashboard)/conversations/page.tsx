"use client";

import { FC } from "react";
import clsx from "clsx";
import { EmptyState } from "@/components/empty-state";
import useConversation from "@/hooks/use-conversations";

const Conversations: FC = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("h-full lg:block lg:pl-80", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Conversations;
