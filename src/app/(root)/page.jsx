import { ModeToggle } from '@/components/ui/mode-toggle'
import { currentUser } from '@/modules/authentication/actions'
import ChatMessageView from '@/modules/chat/components/chat-message-view'
import React from 'react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const Home = async() => {
  const user = await currentUser()
  return (
    <>
      <ChatMessageView user={user}/>
    </>
  )
}

export default Home