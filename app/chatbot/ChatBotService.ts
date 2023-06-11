import axios, {AxiosRequestConfig} from 'axios'
import {Session} from 'next-auth'

enum Personality {
  Friendly = 'friendly',
  Professional = 'professional',
  Sarcastic = 'sarcastic',
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const ChatBotService = {
  // these methods are just placeholders. You'll need to replace these with actual implementations.
  startBot: async (session: Session) => {
    try {
      const response = await axios.post(`${backendUrl}/twitch/start`, {session})
      if (response.status === 200) {
        return 'Bot started successfully'
      } else {
        throw new Error('Failed to start bot')
      }
    } catch (error) {
      console.log(error)
    }
  },
  stopTmi: async () => {
    try {
      await axios.put(`${backendUrl}/twitch/stopTmi`)
    } catch (error) {
      console.error('stopTmi: ', error)
    }
  },
  botAlive: async (session: Session): Promise<boolean> => {
    try {
      const response = await axios.put(`${backendUrl}/twitch/isAlive`, {
        session,
      })
      if (response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  },
  isOnlineByName: async (channel: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${backendUrl}/twitch/isOnlineByName/${channel}`,
      )
      return response.data
    } catch (e) {
      console.error('isOnline: ', e)
      throw e
    }
  },
  removeBot: async (session: Session) => {
    await axios.delete(`${backendUrl}/twitch/remove`, {data: {session}})
  },
  setBotPersonality: async (personality: Personality) =>
    await axios.post('/personality', {personality}),
  joinChannel: async (channel: string) =>
    await axios.post(`${backendUrl}/twitch/join/${channel}`),
  tmiOnline: async () => await axios.get(`${backendUrl}/twitch/tmiOnline`),
}

export default ChatBotService
