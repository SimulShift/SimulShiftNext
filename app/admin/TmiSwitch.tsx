import {useSession} from 'next-auth/react'
import {ChangeEvent, useEffect, useState} from 'react'
import {AxiosResponse} from 'axios'
import Switch from '@mui/material/Switch'
import {startTmi, tmiStatus} from '../api/chatbot/AdminServices'
import {TbRobotOff, TbRobot} from 'react-icons/tb'
import {styled} from '@mui/material/styles'

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

const TmiSwitch = () => {
  const {data: session} = useSession()
  let [tmiOnlineBool, setTmiOnlineBool] = useState<boolean>(false)

  // useEffect check if tmiOnline
  useEffect(() => {
    console.log('tmiOnline checking...')
    tmiStatus()
      .then((status: string) => {
        if (typeof status != 'string') throw new Error('status is not string')
        console.log('tmiStatus:', status)
        if (status === 'OPEN') setTmiOnlineBool(true)
        else setTmiOnlineBool(false)
      })
      .catch(err => {
        console.error('Error checking if tmi is online:', err)
      })
  }, [tmiOnlineBool])

  const StartChadGpt = async (): Promise<void> => {
    // fetch chatbot endpoint to start chatbot
    try {
      if (!session) throw new Error('Session is null')
      await startTmi(session)
      setTmiOnlineBool(true)
    } catch (err) {
      console.log('Error starting chatbot:', err)
    }
  }

  const stopChadGpt = async (): Promise<void> => {
    try {
      await stopTmi()
      setTmiOnlineBool(false)
    } catch (err) {
      console.log('Error stopping chatbot:', err)
    }
  }

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): Promise<void> => {
    if (checked) {
      await StartChadGpt()
      setTmiOnlineBool(true)
    } else {
      await stopChadGpt()
      setTmiOnlineBool(false)
    }
  }

  return (
    <>
      <MuiSwitchLarge
        size="medium"
        sx={{m: 10}}
        value={tmiOnlineBool ? 'on' : 'off'}
        checked={tmiOnlineBool}
        onChange={handleChange}
        icon={<TbRobotOff size={30} />}
        checkedIcon={<TbRobot size={30} />}
      />
    </>
  )
}

export default TmiSwitch
function stopTmi() {
  throw new Error('Function not implemented.')
}
