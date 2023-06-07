'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, ChangeEvent, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {redirectUri} from '../api/chatbot/StartChadGpt/route'
import {getSession, useSession} from 'next-auth/react'

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
    const strippedUrl = redirectUri.replace(/\/callback$/, '')
    router.push(strippedUrl)
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-lg">
        {session?.user?.name + "'s Chat Bot Control Room"}
      </h2>
      <button className="font-semibold py-2 px-4 rounded">
        Request Chat Bot
      </button>
      <br />
      {process.env.NODE_ENV == 'development' && (
        <button
          onClick={StartChadGpt}
          className="font-semibold py-2 px-4 rounded mt-20">
          Start Chad GPT
        </button>
      )}
    </div>
  )
}

export default ChatBotPage
