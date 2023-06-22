import axios, {AxiosRequestConfig} from 'axios'
import {Session} from 'next-auth'

enum Personality {
  Friendly = 'friendly',
  Professional = 'professional',
  Sarcastic = 'sarcastic',
}

const backendUrl = process.env.EXPRESS_BACKEND_URL
const twitchUserEndpoint = `${backendUrl}/twitch/user`
const UserChatBotService = {
  // these methods are just placeholders. You'll need to replace these with actual implementations.

  /* Checks if the bot is alive
   * @param session: Session object from next-auth
   */
  botAlive: async (session: Session): Promise<boolean> => {
    try {
      const response = await axios.put(`${twitchUserEndpoint}/isAlive`, {
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
  /* Checks if the bot is active in a specific channel
   * @param channel: The channel to check
   */
  isOnlineByName: async (channel: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${twitchUserEndpoint}/isOnlineByName/${channel}`,
      )
      return response.data
    } catch (e) {
      console.error('isOnline: ', e)
      throw e
    }
  },
  /* Remove bot from the channel that the user is logged in as
   * @param session: Session object from next-auth
   */
  removeBot: async (session: Session) => {
    await axios.delete(`${twitchUserEndpoint}/remove`, {data: {session}})
  },
  /* Set the bot's personality
   * TODO: Not implemented yet
   * @param personality: The personality to set
   */
  setBotPersonality: async (personality: Personality) =>
    await axios.post('/personality', {personality}),
  /* Join a channel specificed by the param
   * @param channel: The channel to join
   */
  joinChannel: async (channel: string) =>
    await axios.put(`${twitchUserEndpoint}/join/${channel}`),
  /* Checks if tmi is online
   */
  tmiOnline: async () => await axios.get(`${twitchUserEndpoint}/tmiOnline`),
}

export default UserChatBotService
