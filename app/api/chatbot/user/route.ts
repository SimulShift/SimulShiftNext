/* file: api/chatbot/route.ts
 * author: SimulShift
 * purpose: Route for chatbot
 */

import TwitchBot from '../TwitchBot'

export const GET = async (req: Request) => {
  if (!TwitchBot.chadClientId) {
    return new Response('ChadGPT client Id is missing!', {status: 400})
  }

  if (!TwitchBot.chadGptCredentials?.token) {
    return new Response('ChadGPT has no access token!', {status: 400})
  }
  const userInfo = await TwitchBot.getUserInfo(
    TwitchBot.chadClientId,
    TwitchBot.chadGptCredentials.token,
  )
  console.log('userInfo:', userInfo)
  return new Response(`Retrieved user info!`)
}
