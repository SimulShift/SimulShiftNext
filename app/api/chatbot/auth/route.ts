import {redirect} from 'next/navigation'

export const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://simulshift.com/auth/callback'
    : `http://localhost:3000/api/chatbot/auth/callback`

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
