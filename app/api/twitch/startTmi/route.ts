import {NextApiRequest} from 'next'
import TmiBot from '../../twitch/TmiBot'
import {JWT, getToken} from 'next-auth/jwt'

type ExtendedJwt = JWT & {
  accessToken: string
  sub: string
  iat: number
  exp: number
  jti: string
}

export const GET = async (req: NextApiRequest) => {
  const jwt: JWT | null = await getToken({req})
  if (!jwt) return new Response('JWT is null or undefined!', {status: 400})
  const extendedJwt: ExtendedJwt = jwt as ExtendedJwt
  const accessToken: string | undefined | null =
    extendedJwt.accessToken as string

  if (!accessToken)
    return new Response('No accessToken provided!', {status: 400})

  TmiBot.startBot(accessToken)
  return new Response('Twitch bot started!')
}
