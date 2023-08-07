import {cookieToJson, getCookie} from '@/app/utils/Cookie'

export type TwitchUserData = {
  id: string
  login: string
  displayName: string
  image: string
  createdAt: string
}

/**
 * Get the twitch user data from the cookie
 * @returns {TwitchUserData}
 */
export const getProfile = (): TwitchUserData => {
  const cookie = getCookie('userData')
  return cookieToJson(cookie)
}
