'use client'
import {useSession} from 'next-auth/react'
import UserChatBotService from '../api/chatbot/UserServices'
import style from './controlPanel.module.css'
import {useEffect, useState} from 'react'

const BotOnline = () => {
  const [botAlive, setBotAlive] = useState(false)
  const {data: session, status} = useSession({
    required: true,
  })

  const joinChannel = (event: any) => {
    if (!session?.user?.name) throw new Error('Session is null')
    UserChatBotService.joinChannel(session.user.name).then(() => {
      console.log('Bot added to channel:', session.user?.name)
      // set bot to alive
      setBotAlive(true)
    })
  }

  const leaveChannel = (event: any) => {
    if (!session) throw new Error('Session is null')
    UserChatBotService.removeBot(session).then(() => {
      console.log('Bot removed from channel:', session?.user?.name)
      // set bot to dead
      setBotAlive(false)
    })
  }

  const checkIfBotIsAlive = async () => {
    try {
      if (!session) throw new Error('Session is null or undefined')
      //ChatBotService.botAlive(session).then(res => {
      if (!session.user?.name) return
      const botAlive = await UserChatBotService.isOnlineByName(
        session.user.name,
      )
      setBotAlive(botAlive)
    } catch (err) {
      console.log('Error checking if bot is alive:', err)
    }
  }

  useEffect(() => {
    console.log('status in ChatBotPage is:', status)
    if (status === 'authenticated') checkIfBotIsAlive()
  }, [session])

  return (
    <>
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
          onClick={joinChannel}>
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
    </>
  )
}

export default BotOnline
