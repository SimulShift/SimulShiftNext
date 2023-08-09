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
export const getProfile = (): TwitchUserData | null => {
  try {
    const cookie = getCookie('userData')
    if (!cookie) return null
    return cookieToJson(cookie)
  } catch (e) {
    console.error('Error getting profile', e)
    return null
  }
}
