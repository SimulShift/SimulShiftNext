const backendUrl = process.env.EXPRESS_BACKEND_URL
const twitchAdminEndpoint = `${backendUrl}/twitch/admin`

export const GET = async () => {
  try {
    return fetch(`${twitchAdminEndpoint}/tmi/status`, {cache: 'no-store'})
    //return new Response('test', {status: response.status})
  } catch (error) {
    console.error('tmiStatus: ', error)
    throw new Error('Failed to get tmi status')
  }
}
