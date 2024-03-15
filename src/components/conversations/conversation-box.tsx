"use client";
import { FullConversation } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "../ui/avatar";
import { GroupAvatar } from "../ui/group-avatar";

interface ConversationBoxProps {
  conversation: FullConversation;
  selected: boolean;
}

export const ConversationBox: FC<ConversationBoxProps> = ({
  conversation,
  selected,
}) => {
  const router = useRouter();

  const otherUser = useUser(conversation);

  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages;

    if (messages.length > 0) {
      return messages[messages.length - 1];
    }
    return null;
  }, [conversation.messages]);

  const userEmail = session.data?.user?.email;

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen;

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        relative 
        flex 
        w-full 
        cursor-pointer 
        items-center 
        space-x-3 
        rounded-lg
        p-3
        transition
        hover:bg-neutral-100
        `,
        selected ? "bg-neutral-100" : "bg-white",
      )}
    >
      {conversation.isGroup ? (
        <GroupAvatar users={conversation.users} />
      ) : (
        <Avatar userImage={otherUser.image} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-gray-900">
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs 
                  font-light 
                  text-gray-400
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? "text-gray-500" : "font-medium text-black",
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
