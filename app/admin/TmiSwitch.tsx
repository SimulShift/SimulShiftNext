'use client'

import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react'
import Switch from '@mui/material/Switch'
import {startTmi, stopTmi, tmiStatus} from '../services/twitch/TmiAdminServices'
import {TbRobotOff, TbRobot} from 'react-icons/tb'
import {styled} from '@mui/material/styles'
import {TwitchBotAdminServiceClient} from '@/Protos/TwitchBot/TwitchBotServiceClientPb'
import {ReadyState, StartTmiRequest, TmiStatusRequest} from '@/Protos/TwitchBot/TwitchBot_pb'
import {getEnumKey} from '@/utils/EnumTools'

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

var client = new TwitchBotAdminServiceClient('http://localhost:8080', null, {
  withCredentials: true,
})

type tmiSwitchProps = {
  status: string
  setTmiStatusStr: Dispatch<SetStateAction<string>>
}

const TmiSwitch = ({status, setTmiStatusStr}: tmiSwitchProps) => {
  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): Promise<void> => {
    //checked ? await startTmi() : await stopTmi() TODO:
    if (checked) {
      client.startTmi(new StartTmiRequest(), {}, (err, response) => {
        if (err) {
          console.log('error starting tmi', err)
        } else {
          console.log('tmi started', response)

          client.tmiStatus(new TmiStatusRequest(), {}, (err, tmiStatusResponse) => {
            if (err) {
              console.log('error getting tmi status', err)
            } else {
              setTmiStatusStr(getEnumKey(ReadyState, tmiStatusResponse.getReadystate()))
            }
          })
        }
      })
    }
  }

  return (
    <>
      <MuiSwitchLarge
        size="medium"
        sx={{m: 10}}
        checked={status === 'OPEN'}
        onChange={handleChange}
        icon={<TbRobotOff size={30} />}
        checkedIcon={<TbRobot size={30} />}
      />
    </>
  )
}

export default TmiSwitch
