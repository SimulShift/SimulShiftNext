import {path} from '../path'
import axios, {AxiosError} from 'axios'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  joined: boolean
}
export const PUT = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    console.log('Joining channel', params.user)
    const channel = params.user
    const response = await axios.put(`${path}/${channel}/join`)
    const botJoinedResponse: BotJoinedResponse = response.data
    console.log(`Checking if ${channel} is online with response:`, botJoinedResponse)
    return NextResponse.json(botJoinedResponse, {headers: {'cache-control': 'no-store'}})
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      console.error('axios error in /api/twitch/[user]/join', error.toJSON())
    } else {
      console.error('Unknown error in user join route', error)
    }
    return NextResponse.json({joined: false}, {status: 500})
  }
}
