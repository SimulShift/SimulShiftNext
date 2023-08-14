import UrlBuilder, {TmiEndPoints} from '../../../utils/UrlBuilder'

export type TmiReadyState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
export const cacheBuster = (url: string) => `${url}?cb=${Date.now()}`

export type TmiStartResponse = {
  error?: any
  readyState?: TmiReadyState
  status?: number
}

export type TmiStatusResponse = {
  error?: any
  tmiClientOnline?: boolean
  readyState?: TmiReadyState
  status?: number
}

/* Starts the tmi Bot
 * @param session: Session object from next-auth
 */
export const startTmi = async (): Promise<TmiReadyState> => {
  try {
    const urlBuilder = new UrlBuilder()
    urlBuilder.admin().tmi(TmiEndPoints.start)
    const res = await fetch(urlBuilder.build(), {
      method: 'PUT',
      body: JSON.stringify({message: 'Start Tmi Bot'}),
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
