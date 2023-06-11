import ChatBotService from './ChatBotService'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import {AxiosResponse} from 'axios'

const DevTools = () => {
  const {data: session} = useSession()
  let [tmiOnline, setTmiOnline] = useState<boolean | undefined>()

  // useEffect check if tmiOnline
  useEffect(() => {
    console.log('tmiOnline checking...')
    ChatBotService.tmiOnline()
      .then((res: AxiosResponse<boolean>) => {
        console.log('tmiOnline is:', res.data)
        setTmiOnline(res.data)
        return res
      })
      .catch(err => {
        console.error('Error checking if tmi is online:', err)
      })
  }, [tmiOnline])

  const StartChadGpt = async (): Promise<void> => {
    // fetch chatbot endpoint to start chatbot
    try {
      if (!session) throw new Error('Session is null')
      await ChatBotService.startBot(session)
      setTmiOnline(true)
    } catch (err) {
      console.log('Error starting chatbot:', err)
    }
  }

  const stopChadGpt = async (): Promise<void> => {
    try {
      await ChatBotService.stopTmi()
      setTmiOnline(false)
    } catch (err) {
      console.log('Error stopping chatbot:', err)
    }
  }

  return (
    <>
      {(() => {
        switch (tmiOnline) {
          case false:
            return (
              <button
                className="font-semibold py-2 px-4 rounded mt-20 bg-blue-500 hover:bg-blue-700 text-white"
                onClick={StartChadGpt}>
                Start Chad GPT
              </button>
            )
          case true:
            return (
              <>
                <div className="text-green-300">tmi.js is online</div>
                <button
                  className="bg-green-300 text-green-900 rounded p-2 mt-4"
                  onClick={stopChadGpt}>
                  Go Offline
                </button>
              </>
            )
          default:
            return <div>Loading...</div>
        }
      })()}
    </>
  )
}

export default DevTools
