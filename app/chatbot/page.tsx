'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import React, {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import BotStatus from './BotStatus'
import {checkJoined} from '../api/chatbot/UserServices'
import BotSwitch from './BotSwitch'
import ControlPanel from './ControlPanel'
import Typography from '@mui/material/Typography'
import {Container} from '@mui/material'

const ChatBotPage = () => {
  const {data: session} = useSession({required: true})
  const [online, setOnline] = useState<boolean>(false)

  const botOnline = async () => {
    try {
      if (!session?.user?.name) return
      const botOnline = await checkJoined(session.user.name)
      setOnline(botOnline)
    } catch (err) {
      console.log('Error checking if joined:', err)
    }
  }

  useEffect(() => {
    botOnline()
  }, [])

  return (
    <Container maxWidth="md">
      <Typography variant="h3" m={5}>
        {session?.user?.name + "'s Chat Bot Control Room"}
      </Typography>
      <BotStatus online={online} />
      <BotSwitch online={online} setOnline={setOnline} />
      <ControlPanel />
    </Container>
  )
}

export default ChatBotPage
