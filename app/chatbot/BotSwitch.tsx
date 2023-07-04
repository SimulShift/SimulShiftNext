import {useSession} from 'next-auth/react'
import {ChangeEvent, useEffect, useState} from 'react'
import {joinChannel, leaveChannel} from '../api/chatbot/UserServices'
import {TbRobot, TbRobotOff} from 'react-icons/tb'
import styled from '@emotion/styled'
import {Switch, Tooltip} from '@mui/material'
import {ExtendedSession} from '../api/auth/[...nextauth]/route'

const activeToggle = 'Your Chatbot is Online! Give chad  a command in your twitch channel'
const inactiveToggle =
  'Your Chatbot is Offline! Turn it on to give chad commands in your twitch channel'

export const MuiSwitchLarge = styled(Switch)(({theme}) => ({
  width: 150,
  height: 70,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    top: '50%',
    padding: 0,
    transform: 'translateY(-50%) translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(85px) translateY(-50%)',
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
  },
  '& .MuiSwitch-track': {
    borderRadius: 30,
  },
}))

type BotSwitchProps = {
  online: boolean
  setOnline: (online: boolean) => void
}

const BotSwitch = ({online, setOnline}: BotSwitchProps) => {
  const {data: session, status} = useSession({
    required: true,
  })
  const extendedSession = session as ExtendedSession
  const defaultActiveToggle = activeToggle ?? 'Switched On'
  const defaultInactiveToggle = inactiveToggle ?? 'Switched Off'

  const handleChange = async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!session?.user?.name) throw new Error('Session is null')
    console.log('Switch pressed! checked:', checked)
    const channel = session.user.name
    if (!extendedSession.sub || !extendedSession.accessToken)
      throw new Error('sub or token is undefined')
    console.log('Extended Session.sub:', extendedSession.sub)
    const joined = checked
      ? await joinChannel(channel, extendedSession.sub, extendedSession.accessToken)
      : await leaveChannel(channel, extendedSession.sub)
    console.log('Processing Finished, joined:', joined)
    setOnline(joined)
  }

  return (
    <Tooltip title={online ? defaultActiveToggle : defaultInactiveToggle} arrow>
      <MuiSwitchLarge
        size="medium"
        sx={{m: 2}}
        checked={online ?? false}
        onChange={handleChange}
        icon={<TbRobotOff size={50} />}
        checkedIcon={<TbRobot size={50} />}
      />
    </Tooltip>
  )
}
export default BotSwitch
