'use client'

import {useEffect, useState} from 'react'
import BotStatus from '../BotStatus'
import BotSwitch from '../BotSwitch'
import {checkJoined} from '@/app/api/chatbot/UserServices'
import {useSession} from 'next-auth/react'
import {Box} from '@mui/material'
import {ExtendedSession} from '@/app/api/auth/[...nextauth]/route'

const JoinSwitch = () => {
  const {data: session} = useSession({required: true})
  const extendedSession = session as ExtendedSession
  const [joined, setJoined] = useState<boolean>(false)

  //console.log('Session:', session)

  const botOnline = async () => {
    try {
      if (!session?.user?.name || !extendedSession.sub) {
        console.log('Session is null', session)
        return
      }
      setJoined(await checkJoined(session.user.name, extendedSession.sub))
    } catch (err) {
      console.log('Error checking if joined:', err)
    }
  }

  useEffect(() => {
    botOnline()
  }, [session])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <BotStatus online={joined} />
      <BotSwitch online={joined} setOnline={setJoined} />
    </Box>
  )
}

export default JoinSwitch