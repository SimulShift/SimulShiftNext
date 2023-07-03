'use client'
import {useSession} from 'next-auth/react'

type BotStatusProps = {
  online: boolean
}

const BotStatus = ({online}: BotStatusProps) => {
  return <div>{online ? 'Chat Bot is ON' : 'Chat Bot is OFF'}</div>
}

export default BotStatus
