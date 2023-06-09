import axios from 'axios'
import {Personality} from '../api/chatbot/Personality'
import TmiBot from '../api/twitch/TmiBot'
import {getToken} from 'next-auth/jwt'
import {useSession} from 'next-auth/react'
import {Session} from 'next-auth'

const isBotActive = (session: Session): boolean => {
  console.log('session inside isBotActive', session)

  const twitchBot: TmiBot = TmiBot.getInstance()
  const joinedChannels = twitchBot.chadGptTmiClient.getChannels()
  // gets channel
  const channel = session.user?.name
  if (!channel) throw new Error('No user in session')
  if (joinedChannels.includes(channel)) {
    return true
  } else {
    return false
  }
}

const ChatBotService = {
  // these methods are just placeholders. You'll need to replace these with actual implementations.
  getBotStatus: async () => await axios.get('/api/bot/status'),
  getBotMessages: async () => await axios.get('/api/bot/messages'),
  setBotPersonality: async (personality: Personality) =>
    await axios.post('/api/bot/personality', {personality}),
  joinChannel: async (channel: string) =>
    await axios.post('/api/bot/join', {channel}),
  isBotActive,
}

export default ChatBotService
