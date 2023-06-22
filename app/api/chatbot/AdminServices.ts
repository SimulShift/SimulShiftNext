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
    const response = await axios.post(`${twitchAdminEndpoint}/tmi/start`, {
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

type TmiStatus = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
type TmiStatusResponse = {
  tmiStatus: TmiStatus
}
export const tmiStatus = async (): Promise<TmiStatus> => {
  const res = await fetch('http://localhost:3000/api/twitch/admin/tmi/status')
  const tmiStatusResponse: TmiStatusResponse = await res.json()
  return tmiStatusResponse.tmiStatus
}
