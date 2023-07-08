import UrlBuilder, {TwitchUserEndPoints} from '@/app/utils/UrlBuilder'
import {NextResponse} from 'next/server'

export type BotLeaveResponse = {
  joined: boolean
  error?: any
}

export const PUT = async (req: Request) => {
  const reqUrl = new URL(req.url)
  const userId = reqUrl.searchParams.get('userId')
  const urlBuilder = new UrlBuilder(true)
  urlBuilder.twitch(TwitchUserEndPoints.leave).userId(userId)

  try {
    const res = await fetch(urlBuilder.build(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId}),
    })
    const botLeaveResponse: BotLeaveResponse = await res.json()
    return NextResponse.json(botLeaveResponse)
  } catch (error: any) {
    console.error('Unknown error in user leave route', error)
    return NextResponse.json({joined: false, error})
  }
}
