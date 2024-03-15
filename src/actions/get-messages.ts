import { prismaClient } from "@/libs/prismadb";

export const getMessages = (conversationId: string) => {
  try {
    const messages = prismaClient.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch {
    return [];
  }
};
