import UrlBuilder, {TwitchUserEndPoints} from '@/utils/UrlBuilder'

/* Checks if the bot is alive
 * @param session: Session object from next-auth
 */
export const botJoined = async (session: Session): Promise<boolean> => {
  const urlBuilder = new UrlBuilder().channel(session.user?.name)
  urlBuilder.twitch(TwitchUserEndPoints.joined)
  try {
    const res = await fetch(urlBuilder.build())
    const botJoinedResponse: BotJoinedResponse = await res.json()
    return botJoinedResponse.joined
  } catch (e) {
    return false
  }
}

/* Checks if the bot is active in a specific channel
 * @param channel: The channel to check
 */
export const checkJoined = async (channel: string, userId: string): Promise<boolean> => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.twitch(TwitchUserEndPoints.joined).userId(userId).channel(channel)
  try {
    const response = await fetch(urlBuilder.build(), {
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
 * @param personality: The personality to set﻿/
export const setBotPersonality = async (personality: Personality) => {
  console.log('Setting personality to', personality)
  const urlBuilder = new UrlBuilder()
  urlBuilder.gpt(GptEndPoints.personality)
  try {
    const res = await fetch(urlBuilder.build(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({personality}),
    })
  } catch (e) {
    console.error('Error setting personality', e)
  }
}

/* Join a channel specificed by the param
 * @param channel: The channel to join
 * @returns: Whether or not the bot was able to join the channel
 */
export const joinChannel = async (channel: string, userId: string): Promise<boolean> => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.twitch(TwitchUserEndPoints.join).channel(channel).userId(userId)
  const res = await fetch(urlBuilder.build(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const botJoinedResponse: BotJoinedResponse = await res.json()
  return botJoinedResponse.joined
}

/* Remove bot from the channel that the user is logged in as
 * @param session: Session object from next-auth
 */
export const leaveChannel = async (channel: string, userId: string): Promise<boolean> => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.twitch(TwitchUserEndPoints.leave).channel(channel).userId(userId)
  try {
    const res = await fetch(urlBuilder.build(), {
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
