import {ChangeEvent, useState} from 'react'
import {TbRobot, TbRobotOff} from 'react-icons/tb'
import styled from '@emotion/styled'
import {Switch, Tooltip} from '@mui/material'
import {joinChannel, leaveChannel} from '@/app/services/twitch/UserServices'

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

interface ExtendedSession {
  sub: string
  accessToken: string
  channel: string
}

type BotSwitchProps = {
  online: boolean
  setOnline: (online: boolean) => void
}

const BotSwitch = ({online, setOnline}: BotSwitchProps) => {
  const [extendedSession, setSession] = useState<ExtendedSession | null>(null)

  const defaultActiveToggle = activeToggle ?? 'Switched On'
  const defaultInactiveToggle = inactiveToggle ?? 'Switched Off'

  const handleChange = async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    console.log('Switch pressed! checked:', checked)
    if (!extendedSession?.sub || !extendedSession.accessToken)
      throw new Error('sub or token is undefined')
    console.log('Extended Session.sub:', extendedSession.sub)
    const joined = checked
      ? await joinChannel(extendedSession.channel, extendedSession.sub, extendedSession.accessToken)
      : await leaveChannel(extendedSession.channel, extendedSession.sub)
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
