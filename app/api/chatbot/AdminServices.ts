import {Session} from 'next-auth'
import axios from 'axios'

export type TmiStatus = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
export type TmiStatusResponse = {
  tmiStatus: TmiStatus
}
/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (session: Session) => {
  return await axios.put(`/api/twitch/admin/tmi/start`, session)
}

/* Stops the tmi Bot
 * @param session: Session object from next-auth
 */
export const stopTmi = async () => {
  return await axios.put(`/api/twitch/admin/tmi/stop`)
}

/* Status of Tmi bot
 * Returns one of the following states: "CONNECTING", "OPEN", "CLOSING" or "CLOSED".
 */

export const tmiStatus = async (): Promise<TmiStatus> => {
  const res = await fetch('/api/twitch/admin/tmi/status')
  return (await res.json()).tmiStatus
}
