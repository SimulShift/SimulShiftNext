'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, ChangeEvent, useEffect, MouseEventHandler} from 'react'
import {useSession} from 'next-auth/react'
import ChatBotService from './ChatBotService'
import style from './controlPanel.module.css'
import DevTools from './DevTools'

const ChatBotPage = () => {
  const [botAlive, setBotAlive] = useState(false)
  const {data: session, status} = useSession({
    required: true,
  })

  const checkIfBotIsAlive = async () => {
    try {
      if (!session) throw new Error('Session is null or undefined')
      //ChatBotService.botAlive(session).then(res => {
      if (!session.user?.name) return
      const botAlive = await ChatBotService.isOnlineByName(session.user.name)
      setBotAlive(botAlive)
    } catch (err) {
      console.log('Error checking if bot is alive:', err)
    }
  }

  useEffect(() => {
    console.log('status in ChatBotPage is:', status)
    if (status === 'authenticated') checkIfBotIsAlive()
  }, [session])

  const addBotToChannel = (event: any) => {
    if (!session) throw new Error('Session is null')
    ChatBotService.deployBot(session).then(() => {
      console.log('Bot added to channel:', session?.user?.name)
      // set bot to alive
      setBotAlive(true)
    })
  }

  const leaveChannel = (event: any) => {
    if (!session) throw new Error('Session is null')
    ChatBotService.removeBot(session).then(() => {
      console.log('Bot removed from channel:', session?.user?.name)
      // set bot to dead
      setBotAlive(false)
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-lg">
        {session?.user?.name + "'s Chat Bot Control Room"}
      </h2>
      <div
        //className={`notification ${botAlive ? 'on' : 'off'}`}>
        className={`${style.notification} ${
          botAlive ? style.notificationOn : style.notificationOff
        }`}>
        {botAlive ? 'Chat Bot is ON' : 'Chat Bot is OFF'}
      </div>
      {!botAlive ? (
        <button
          className="font-semibold py-2 px-4 rounded"
          onClick={addBotToChannel}>
          Request Chat Bot
        </button>
      ) : (
        <button
          className="font-semibold py-2 px-4 rounded"
          onClick={leaveChannel}>
          Leave Channel
        </button>
      )}
      <br />
      {(process.env.NODE_ENV == 'development' ||
        session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt') && (
        <DevTools />
      )}
    </div>
  )
}

export default ChatBotPage
