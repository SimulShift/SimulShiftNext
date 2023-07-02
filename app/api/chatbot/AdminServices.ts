import {Session} from 'next-auth'
import axios, {AxiosResponse, AxiosError} from 'axios'
import {signOut} from 'next-auth/react'
import {TmiStatusResponse} from '../twitch/admin/tmi/status/route'
import {TmiStartResponse} from '../twitch/admin/tmi/start/route'

export type TmiReadyState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
export const cacheBuster = (url: string) => `${url}?cb=${Date.now()}`

/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (session: Session) => {
  try {
    const res: AxiosResponse = await axios.put(`/api/twitch/admin/tmi/start`, session)
    const tmiStartResponse: TmiStartResponse = res.data
    return tmiStartResponse.readyState
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log('Unauthorized, redirecting to signout')
        signOut()
        return
      }
      return console.error('Error starting Tmi Bot', error.toJSON())
    }
    return console.error('Error starting Tmi Bot', error)
  }
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
export const tmiStatus = async (): Promise<TmiReadyState | 'Tmi Bot is not running'> => {
  const url = '/api/twitch/admin/tmi/status'
  // refacoring this to fetch
  //const res = await fetch(cacheBuster(url))
  const res = await fetch(url)
  const data: TmiStatusResponse = await res.json()
  console.log('Tmi ReadyState', data)
  return data.readyState ?? 'Tmi Bot is not running'
}
