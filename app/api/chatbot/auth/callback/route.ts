import {NextRequest} from 'next/server'
import TwitchBot from '../../TwitchBot'
import {redirectUri} from '../route'

export let twitchBot: TwitchBot
// Step 1: Redirect the user to the Twitch authorization URL
// Step 2: Handle the authorization callback
export const GET = (req: NextRequest) => {
  const code: string | null = req.nextUrl.searchParams.get('code')

  if (!code) {
    return new Response('No code provided!', {status: 400})
  }

  if (!redirectUri) {
    return new Response('No redirect URI provided!', {status: 400})
  }
  const codeStr: string = Array.isArray(code) ? code.join(', ') : code
  handleAuthorizationCallback(codeStr).catch(console.error)
  return new Response('Authorization successful! You can close this window.')
}

const handleAuthorizationCallback = async (code: string) => {
  await twitchBot.InitChadTmiClient(code, redirectUri).catch(console.error)
  await twitchBot.startBot().catch(console.error)
}
