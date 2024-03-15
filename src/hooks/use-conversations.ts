import { useParams } from "next/navigation";

const useConversation = () => {
  const params = useParams();
  const conversationId = params.conversationId ? params.conversationId : "";

  const isOpen = !!conversationId;

  return {
    isOpen,
    conversationId: Array.isArray(conversationId)
      ? conversationId[0]
      : conversationId,
  };
};

export default useConversation;
