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

const ChatBotPage = () => {
  const {data: session} = useSession({required: true})

  useEffect(() => {
    backendFetchTest2()
    backendFetchTest()
  }, [])

  const backendFetchTest2 = async () => {
    console.log('backend fetch test with next api')
    const res = await fetch(`/api/test`)
    const data = await res.json()
    console.log('backend fetch test with next api', data)
  }

  const backendFetchTest = async () => {
    console.log('backend fetch test')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`)
      const data = await res.json()
      console.log('backend fetch test', data)
    } catch (e) {
      console.log('backend fetch test error', e)
    }
  }

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
