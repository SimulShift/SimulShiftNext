import {redirect} from 'next/navigation'
import {redirectUri} from '../constants'

console.log('Redirect URI:', redirectUri)

export const GET = async () => {
  // set base url based on NODE_ENV
  console.log('redirectUri:', redirectUri)

  const clientId = process.env.TWITCH_CLIENT_ID || ''
  const scopes: string[] = ['chat:read', 'chat:edit']
  const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(
    ' ',
  )}`

  redirect(authUrl)
}
