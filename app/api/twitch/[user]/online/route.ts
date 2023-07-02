import {path} from '../path'
import axios, {AxiosError} from 'axios'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  online: boolean
}

export const GET = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    const channel = params.user
    const response = await axios.get(`${path}/${channel}/online`)
    const botOnlineResponse: BotJoinedResponse = response.data
    console.log(`Checking if ${channel} is online with response:`, botOnlineResponse)
    return NextResponse.json(botOnlineResponse, {
      status: 200,
      headers: {'cache-control': 'no-store'},
    })
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      console.error('axios error in route api/twitch/[user]/online', error.toJSON())
    } else {
      console.error('error in route api/twitch/[user]/online', error)
    }
    return NextResponse.json({online: false}, {status: 500})
  }
}
