"use client";
import { FullConversation } from "@/app/types";
import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./conversation-box";
import useConversation from "@/hooks/use-conversations";
import { GroupChatModal } from "./group-chat-modal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface ConversationsListProps {
  initalConversations: FullConversation[];
  users: User[];
}

export const ConversationsList: FC<ConversationsListProps> = ({
  initalConversations,
  users,
}) => {
  const [conversations, setConversations] = useState(initalConversations);

  const session = useSession();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    const newConversationHandler = (newConversation: FullConversation) => {
      setConversations((current) => {
        if (find(current, { id: newConversation.id })) {
          return current;
        }
        return [newConversation, ...current];
      });
    };

    const deleteConversationHandler = (
      deletedConversation: FullConversation,
    ) => {
      setConversations((current) => {
        return current.filter(
          (conversation) => conversation.id !== deletedConversation.id,
        );
      });
    };

    const updateConversationHandler = (
      updatedConversation: FullConversation,
    ) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === updatedConversation.id) {
            return {
              ...currentConversation,
              messages: updatedConversation.messages,
            };
          }
          return currentConversation;
        }),
      );
    };
    pusherClient.subscribe(pusherKey);

    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:delete", deleteConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:delete", deleteConversationHandler);
    };
  }, [pusherKey]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { conversationId, isOpen } = useConversation();
  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        users={users}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
        fixed
        inset-y-0
        overflow-y-auto
        border-r
      border-gray-200
        pb-20
        lg:left-20
        lg:block
        lg:w-80
        lg:pb-0`,
          isOpen ? "hidden" : "left-0 block w-full",
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-700">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100  p-2 text-gray-600 transition hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
