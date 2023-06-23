const backendUrl = process.env.EXPRESS_BACKEND_URL
const twitchAdminEndpoint = `${backendUrl}/twitch/admin`
import axios from 'axios'

export const GET = async () => {
  try {
    console.log('twichAdminEndpoint: ', twitchAdminEndpoint)
    return axios.get(`${twitchAdminEndpoint}/tmi/status`)
    //return new Response('test', {status: response.status})
  } catch (error) {
    console.error('tmiStatus: ', error)
    throw new Error('Failed to get tmi status')
  }
}
