'use client'

import {useEffect, useState} from 'react'
import BotStatus from './BotStatus'
import {checkJoined} from '@/app/services/twitch/UserServices'
import {Box} from '@mui/material'
import BotSwitch from './BotSwitch'

const JoinSwitch = () => {
  const [session, setSession] = useState<any>({})
  const [joined, setJoined] = useState<boolean>(false)

  //console.log('Session:', session)

  const botOnline = async () => {
    try {
      if (!session?.user?.name || !session.sub) return
      setJoined(await checkJoined(session.user.name, session.sub))
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
