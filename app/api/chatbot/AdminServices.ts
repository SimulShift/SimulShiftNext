import {Session} from 'next-auth'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const twitchAdminEndpoint = `${backendUrl}/twitch/admin`

/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (session: Session) => {
  // how do i check if the session is valid or expired?
  try {
    const response = await axios.post(`${twitchAdminEndpoint}/start`, {
      session,
    })
    if (response.status === 200) {
      return 'Bot started successfully'
    } else {
      throw new Error('Failed to start bot')
    }
  } catch (error) {
    console.log(error)
  }
}

/* Stops the tmi Bot
 * @param session: Session object from next-auth
 */
export const stopTmi = async () => {
  try {
    await axios.put(`${twitchAdminEndpoint}/stopTmi`)
  } catch (error) {
    console.error('stopTmi: ', error)
  }
}

/* Status of Tmi bot
 * Returns one of the following states: "CONNECTING", "OPEN", "CLOSING" or "CLOSED".
 */
export const tmiStatus = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `${twitchAdminEndpoint}/tmiStatus`,
    )
    return response.data
  } catch (error) {
    console.error('tmiStatus: ', error)
  }

  throw new Error('Failed to get tmi status')
}
