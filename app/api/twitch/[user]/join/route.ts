import {path} from '../path'
import axios, {AxiosError} from 'axios'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  joined: boolean
}
export const PUT = async (
  request: Request,
  {params}: {params: {user: string}},
) => {
  try {
    const channel = params.user
    const response = await axios.put(`${path}/${channel}/join`)
    const botJoinedResponse: BotJoinedResponse = response.data
    return NextResponse.json(botJoinedResponse)
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      console.error('axios error in /api/twitch/[user]/join', error.toJSON())
    } else {
      console.error('Unknown error in user join route', error)
    }
    return NextResponse.json({joined: false}, {status: 500})
  }
}
