import { getConversations } from "@/actions/get-conversations";
import { getUsers } from "@/actions/getUsers";
import { ConversationsList } from "@/components/conversations/conversations-list";
import { Sidebar } from "@/components/sidebar/sidebar";
import { FC, PropsWithChildren } from "react";

const UsersLayout: FC<PropsWithChildren> = async ({ children }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList users={users} initalConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
