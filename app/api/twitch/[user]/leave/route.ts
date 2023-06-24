import {NextResponse} from 'next/server'
import {path} from '../path'
import axios, {AxiosError} from 'axios'

export type BotLeaveResponse = {
  joined: boolean
}

export const DELETE = async (
  request: Request,
  {params}: {params: {user: string}},
) => {
  try {
    const res = await axios.delete(`${path}/${params.user}/leave`)
    const botLeaveResponse: BotLeaveResponse = res.data
    return NextResponse.json(botLeaveResponse)
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      console.error('axios error in /api/twitch/[user]/leave', error.toJSON())
    } else {
      console.error('Unknown error in user leave route', error)
    }
    throw error
  }
}
