import axios, {AxiosRequestConfig, AxiosError} from 'axios'
import {Session} from 'next-auth'
import {BotOnlineResponse} from '../twitch/[user]/online/route'
import {BotJoinedResponse} from '../twitch/[user]/join/route'
import {BotLeaveResponse} from '../twitch/[user]/leave/route'

enum Personality {
  Friendly = 'friendly',
  Professional = 'professional',
  Sarcastic = 'sarcastic',
}

const backendUrl = process.env.EXPRESS_BACKEND_URL
const twitchUserEndpoint = `${backendUrl}/twitch/user`
// these methods are just placeholders. You'll need to replace these with actual implementations.

/* Checks if the bot is alive
 * @param session: Session object from next-auth
 */
export const botOnline = async (session: Session): Promise<boolean> => {
  try {
    const botOnlineResponse: BotOnlineResponse = (
      await axios.put(`${twitchUserEndpoint}/isAlive`, {
        session,
      })
    ).data
    return botOnlineResponse.online
  } catch (e) {
    return false
  }
}
/* Checks if the bot is active in a specific channel
 * @param channel: The channel to check
 */
export const checkChannelOnline = async (channel: string): Promise<boolean> => {
  try {
    const response = await axios.get(`/api/twitch/${channel}/online`)
    const botOnlineResponse: BotOnlineResponse = response.data
    return botOnlineResponse.online
  } catch (e: AxiosError | any) {
    if (axios.isAxiosError(e)) {
      console.error('axios error checkChannelOnline', e.toJSON())
    }
    console.error('error checkChannelOnline', e)
  }
  throw new Error('Error checking channel online')
}
/* Set the bot's personality
 * TODO: Not implemented yet
 * @param personality: The personality to set
 */
export const setBotPersonality = async (personality: Personality) =>
  await axios.post('/personality', {personality})

/* Join a channel specificed by the param
 * @param channel: The channel to join
 * @returns: Whether or not the bot was able to join the channel
 */
export const joinChannel = async (channel: string): Promise<boolean> => {
  const res = await axios.put(`api/twitch/${channel}/join`)
  const botJoinedResponse: BotJoinedResponse = res.data
  return botJoinedResponse.joined
}

/* Remove bot from the channel that the user is logged in as
 * @param session: Session object from next-auth
 */
export const leaveChannel = async (channel: string) => {
  try {
    const res = await axios.delete(`api/twitch/${channel}/leave`)
    const botLeaveResponse: BotLeaveResponse = res.data
    return botLeaveResponse.joined
  } catch (e: AxiosError | any) {
    if (axios.isAxiosError(e)) {
      throw e.toJSON()
    } else {
      throw e
    }
  }
}
