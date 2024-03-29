import { FullConversation } from "@/app/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useUser = (conversation: FullConversation | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;
    const otherUsers = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );
    return otherUsers[0];
  }, [conversation.users, session.data?.user?.email]);

  return otherUser;
};
