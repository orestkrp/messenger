import { getCurrentUser } from "@/actions/get-current-user";
import { prismaClient } from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams },
) => {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prismaClient.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
