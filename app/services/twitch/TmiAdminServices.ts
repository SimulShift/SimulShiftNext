import {Session} from 'next-auth'
import {TmiStatusResponse} from '@/app/api/admin/tmi/status/route'
import {TmiStartResponse} from '@/app/api/admin/tmi/start/route'
import UrlBuilder, {TmiEndPoints} from '../../utils/UrlBuilder'

export type TmiReadyState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
export const cacheBuster = (url: string) => `${url}?cb=${Date.now()}`

/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (session: Session): Promise<TmiReadyState> => {
  try {
    const urlBuilder = new UrlBuilder()
    urlBuilder.admin().tmi(TmiEndPoints.start)
    const res = await fetch(urlBuilder.build(), {
      method: 'PUT',
      body: JSON.stringify(session),
    })
    const tmiStartResponse: TmiStartResponse = await res.json()
    return tmiStartResponse.readyState ?? 'CLOSED'
  } catch (error: any) {
    console.error('Error starting Tmi Bot', error)
    return 'CLOSED'
  }
}

/* Stops the tmi Bot
 * @param session: Session object from next-auth
 */
export const stopTmi = async () => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.admin().tmi(TmiEndPoints.stop)
  return await fetch(urlBuilder.build(), {
    method: 'PUT',
  })
}

/* Status of Tmi bot
 * Returns one of the following states: "CONNECTING", "OPEN", "CLOSING" or "CLOSED".
 */
export const tmiStatus = async (): Promise<TmiReadyState | 'Tmi Bot is not running'> => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.admin()
  urlBuilder.tmi(TmiEndPoints.status)
  const res = await fetch(urlBuilder.build())
  const data: TmiStatusResponse = await res.json()
  console.log('Tmi ReadyState', data)
  return data.readyState ?? 'Tmi Bot is not running'
}
