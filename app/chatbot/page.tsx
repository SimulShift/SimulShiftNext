'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, ChangeEvent, useEffect, MouseEventHandler} from 'react'
import {useSession} from 'next-auth/react'
import UserChatBotService from '../api/chatbot/UserServices'
import BotOnline from './BotOnline'

const ChatBotPage = () => {
  return (
    <div className="container mx-auto py-8">
      <BotOnline />
    </div>
  )
}

export default ChatBotPage
