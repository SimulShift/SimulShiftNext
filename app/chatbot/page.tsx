'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, ChangeEvent, useEffect, MouseEventHandler} from 'react'
import {useRouter} from 'next/navigation'
import {getSession, useSession} from 'next-auth/react'
import TmiBot from '../api/twitch/TmiBot'

const ChatBotPage = () => {
  const {data: session, status} = useSession({
    required: true,
  })
  const router = useRouter()

  const getSessionAsync = async () => {
    const session = await getSession()
    console.log('Session', session)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const StartChadGpt = (): void => {
    // fetch chatbot endpoint to start chatbot
    fetch('/api/chatbot/startTmi').catch(err => {
      console.log('Error starting TMI', err)
    })
  }

  const addBotToChannel = (event: any) => {
    event.preventDefault()
    const tmiBot: TmiBot = TmiBot.getInstance()
    const channel = session?.user?.name
    if (!channel) return
    tmiBot.chadGptTmiClient.join(channel).then(() => {
      tmiBot.chadGptTmiClient.say(channel, 'Hello, I am your chat bot!')
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-lg">
        {session?.user?.name + "'s Chat Bot Control Room"}
      </h2>
      <button
        className="font-semibold py-2 px-4 rounded"
        onClick={addBotToChannel}>
        Request Chat Bot
      </button>
      <br />
      {process.env.NODE_ENV == 'development' && (
        <button
          className="font-semibold py-2 px-4 rounded mt-20"
          onClick={StartChadGpt}>
          Start Chad GPT
        </button>
      )}
    </div>
  )
}

export default ChatBotPage
