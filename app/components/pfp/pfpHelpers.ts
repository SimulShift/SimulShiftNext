import {TwitchUserData} from './Pfp'

/**
 * Get the twitch user data from the cookie
 * @returns {TwitchUserData}
 */
export const getProfile = (): TwitchUserData => {
  const cookies = decodeURIComponent(document.cookie)
  const userData = cookies.split('; ').find(row => row.startsWith('userData'))
  const json = JSON.parse(userData?.split('=')[1] || '{}')
  console.log('cookie json', json)
  return json
}
