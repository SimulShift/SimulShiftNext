'use client'
import {useSession} from 'next-auth/react'
import {useState} from 'react'

type BotStatusProps = {
  online: boolean
}

const BotStatus = ({online}: BotStatusProps) => {
  const {data: session, status} = useSession({
    required: true,
  })

  return (
    <>
      <h2 className="text-lg">
        {session?.user?.name + "'s Chat Bot Control Room"}
      </h2>
      <div>{online ? 'Chat Bot is ON' : 'Chat Bot is OFF'}</div>
      <br />
    </>
  )
}

export default BotStatus
