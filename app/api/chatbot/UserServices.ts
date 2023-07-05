import axios from 'axios'
import {Session} from 'next-auth'
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
    const botOnlineResponse = (
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
export const checkJoined = async (channel: string, userId: string): Promise<boolean> => {
  try {
    const url = `/api/twitch/${channel}/joined?userId=${userId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const BotJoinedRespnse: BotJoinedResponse = await response.json()
    console.log(`Checking if bot joined ${channel} with response:`, BotJoinedRespnse)
    return BotJoinedRespnse.joined
  } catch (e) {
    console.error('error checkChannelOnline', e)
    throw new Error('Error checking channel online')
  }
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
export const joinChannel = async (
  channel: string,
  userId: string,
  accessToken: string,
): Promise<boolean> => {
  const res = await fetch(`api/twitch/${channel}/join`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId, accessToken}),
  })
  const botJoinedResponse: BotJoinedResponse = await res.json()
  return botJoinedResponse.joined
}

/* Remove bot from the channel that the user is logged in as
 * @param session: Session object from next-auth
 */
export const leaveChannel = async (channel: string, userId: string): Promise<boolean> => {
  console.log('userId', userId)
  try {
    const res = await fetch(`api/twitch/${channel}/leave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId}),
    })
    const botLeaveResponse: BotLeaveResponse = await res.json()
    return botLeaveResponse.joined
  } catch (error: any) {
    console.error('Unknown error in user leave route', error)
    return false
  }
}
