'use client'
/* File: /app/chatbot/page.tsx
 * Purpose: create a page for chatbot
 * Author: SimulShift
 */

import ControlPanel from './ControlPanel'
import Typography from '@mui/material/Typography'
import {Container} from '@mui/material'

const ChatBotPage = () => {
  const session: any = null

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
