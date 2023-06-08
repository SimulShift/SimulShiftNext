import {NextApiRequest} from 'next'
import TwitchBot from '../TwitchBot'
import {JWT, getToken} from 'next-auth/jwt'

export const GET = async (req: NextApiRequest) => {
  const jwt: JWT | null = await getToken({req})

  const accessToken: string | undefined | null = jwt?.accessToken as string

  if (!jwt) {
    return new Response('JWT is null or undefined!', {status: 400})
  }

  if (!accessToken) {
    return new Response('No access token provided!', {status: 400})
  }

  const twitchBot: TwitchBot = new TwitchBot(accessToken)
  return new Response('Twitch bot started!')
}
