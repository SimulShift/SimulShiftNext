'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import BotStatus from './BotStatus'
import {checkChannelOnline} from '../api/chatbot/UserServices'
import BotSwitch from './BotSwitch'

const ChatBotPage = () => {
  const {data: session} = useSession({required: true})
  const [online, setOnline] = useState<boolean>(false)

  const botOnline = async () => {
    try {
      if (!session?.user?.name) return
      const botOnline = await checkChannelOnline(session.user.name)
      setOnline(botOnline)
    } catch (err) {
      console.log('Error checking if bot is alive:', err)
    }
  }

  useEffect(() => {
    botOnline()
  }, [session])

  return (
    <div className="container mx-auto py-8">
      <BotSwitch online={online} setOnline={setOnline} />
      <BotStatus online={online} />
    </div>
  )
}

export default ChatBotPage
