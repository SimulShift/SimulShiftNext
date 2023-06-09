/* file: api/chatbot/route.ts
 * author: SimulShift
 * purpose: Route for chatbot
 */

import TmiBot from '../TmiBot'

export const GET = async (req: Request) => {
  console.log('TwitchBot.chadClientId:', TmiBot.chadGptCredentials)

  if (!TmiBot.chadClientId) {
    return new Response('ChadGPT client Id is missing!', {status: 400})
  }

  if (!TmiBot.chadGptCredentials?.token) {
    return new Response('ChadGPT has no access token!', {status: 400})
  }

  const userInfo = await TmiBot.getUserInfo(
    TmiBot.chadClientId,
    TmiBot.chadGptCredentials.token,
  )

  console.log('userInfo:', userInfo)
  return new Response(`Retrieved user info!`)
}
