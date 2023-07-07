'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import {useSession} from 'next-auth/react'
import ControlPanel from './ControlPanel'
import Typography from '@mui/material/Typography'
import {Container} from '@mui/material'
import {useEffect} from 'react'
import {ExtendedSession} from '../api/auth/[...nextauth]/route'
import Snatcher from '../utils/Snatcher'

const ChatBotPage = () => {
  const {data: session} = useSession({required: true})
  const extendedSession = session as ExtendedSession

  useEffect(() => {
    if (!extendedSession || !extendedSession.sub) return
    console.log('inuseeffect')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`
    const snatcher = new Snatcher(url, extendedSession)
    snatcher.get().then(res => {
      console.log('res:', res)
    })
  }, [session])

  return (
    <Container maxWidth="md">
      <Typography variant="h3" m={5}>
        {session?.user?.name + "'s Chat Bot Control Room"}
      </Typography>
      <ControlPanel />
    </Container>
  )
}

export default ChatBotPage
