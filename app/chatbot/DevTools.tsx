import {Session} from 'next-auth'
import ChatBotService from './ChatBotService'
import {useSession} from 'next-auth/react'
import {useState} from 'react'

const DevTools = () => {
  const {data: session} = useSession()
  let [tmiOnline, setTmiOnline] = useState(false)

  const StartChadGpt = (): void => {
    // fetch chatbot endpoint to start chatbot
    if (!session) throw new Error('Session is null')
    ChatBotService.startBot(session).then(() => {
      console.log('Chatbot started')
      setTmiOnline(true)
    })
  }

  return (
    <>
      {!tmiOnline ? (
        <button
          className="font-semibold py-2 px-4 rounded mt-20"
          onClick={StartChadGpt}>
          Start Chad GPT
        </button>
      ) : (
        <div className="text-green-600">tmi.js Online</div>
      )}
    </>
  )
}

export default DevTools
