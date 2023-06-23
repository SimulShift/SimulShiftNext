const backendUrl = process.env.EXPRESS_BACKEND_URL
const twitchAdminEndpoint = `${backendUrl}/twitch/admin`
import {NextResponse} from 'next/server'
import axios, {AxiosResponse} from 'axios'

export const GET = async (req, res) => {
  try {
    console.log('twichAdminEndpoint: ', twitchAdminEndpoint)
    const res: AxiosResponse<string> = await axios.get(
      `${twitchAdminEndpoint}/tmi/status`,
    )
    console.log('tmiStatus in api: ', res.data)
    return NextResponse.json(res.data)
  } catch (error) {
    console.error('tmiStatus: ', error)
    throw new Error('Failed to get tmi status')
  }
}
