import { getConversationById } from "@/actions/get-conversation-by-id";
import { getMessages } from "@/actions/get-messages";
import Body from "@/components/conversations/body";
import { Form } from "@/components/conversations/form";
import { Header } from "@/components/conversations/header";
import { EmptyState } from "@/components/empty-state";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
