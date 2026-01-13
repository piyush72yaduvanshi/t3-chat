import MessageView from '@/modules/chat/components/message-view'
import React from 'react'
import ActiveChatLoader from '@/modules/chat/components/active-chat-loader'
import MessageViewWithForm from '@/modules/chat/components/message-view-form';

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const Page = async ({ params }) => {
  const { chatId } = await params;

  return (
    <>
      <ActiveChatLoader chatId={chatId} />
    
      <MessageViewWithForm chatId={chatId} />
    </>
  );
};

export default Page;