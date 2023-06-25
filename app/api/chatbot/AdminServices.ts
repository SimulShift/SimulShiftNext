import {Session} from 'next-auth'
import axios, {AxiosResponse, AxiosError} from 'axios'
import {signOut} from 'next-auth/react'

export type ReadyState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'

type TmiStartResponse = {
  error?: any
  readyState?: ReadyState
  status?: number
}
/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (session: Session) => {
  try {
    const res: AxiosResponse = await axios.put(
      `/api/twitch/admin/tmi/start`,
      session,
    )
    const tmiStartResponse: TmiStartResponse = res.data
    return tmiStartResponse.readyState
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log('Unauthorized, redirecting to signout')
        signOut({callbackUrl: '/api/auth/signin/twitch'})
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

type TmiStatusResponse = {
  error?: any
  readyState?: ReadyState
  status?: number
}

/* Status of Tmi bot
 * Returns one of the following states: "CONNECTING", "OPEN", "CLOSING" or "CLOSED".
 */
export const tmiStatus = async (): Promise<TmiStatusResponse> => {
  const res = await fetch('/api/twitch/admin/tmi/status')
  return (await res.json()).readyState
}
