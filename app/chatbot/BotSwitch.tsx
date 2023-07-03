import {useSession} from 'next-auth/react'
import {ChangeEvent, useEffect, useState} from 'react'
import {joinChannel, leaveChannel} from '../api/chatbot/UserServices'
import {TbRobot, TbRobotOff} from 'react-icons/tb'
import styled from '@emotion/styled'
import {Switch} from '@mui/material'

export const MuiSwitchLarge = styled(Switch)(({theme}) => ({
  width: 68,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(30px)',
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!session?.user?.name) throw new Error('Session is null')
    console.log('Switch pressed! Checking if joined... checked:', checked)
    const channel = session.user.name
    const joined = checked ? await joinChannel(channel) : await leaveChannel(channel)
    console.log('Processing Finished, joined:', joined)
    setOnline(joined)
  }

  return (
    <>
      <MuiSwitchLarge
        size="medium"
        sx={{m: 2}}
        checked={online ?? false}
        onChange={handleChange}
        icon={<TbRobotOff size={30} />}
        checkedIcon={<TbRobot size={30} />}
      />
    </>
  )
}
export default BotSwitch
