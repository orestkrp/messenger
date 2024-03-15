import { prismaClient } from "@/libs/prismadb";
import { getCurrentUser } from "./get-current-user";

export const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return [];
    }

    const conversations = prismaClient.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch {
    return [];
  }
};
