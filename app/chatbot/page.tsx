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
      <h1 className="text-3xl font-bold mb-4">Chat Bot Page</h1>
      <h2>{session?.user?.name}</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <button
          type="submit"
          className="text-white font-semibold py-2 px-4 rounded">
          Request Chat Bot
        </button>
      </form>
      {process.env.NODE_ENV == 'development' && (
        <button
          onClick={StartChadGpt}
          className="text-white font-semibold py-2 px-4 rounded mt-20">
          Start Chad GPT
        </button>
      )}
    </div>
  )
}

export default ChatBotPage
