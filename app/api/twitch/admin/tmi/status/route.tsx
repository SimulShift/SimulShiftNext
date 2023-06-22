const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const twitchAdminEndpoint = `${backendUrl}/twitch/admin`
import {NextApiRequest} from 'next'

export const GET = async (req: NextApiRequest) => {
  try {
    return fetch(`${twitchAdminEndpoint}/tmi/status`, {cache: 'no-store'})
    //return new Response('test', {status: response.status})
  } catch (error) {
    console.error('tmiStatus: ', error)
    throw new Error('Failed to get tmi status')
  }
}
