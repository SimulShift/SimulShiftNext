import UrlBuilder, {TwitchUserEndPoints} from '@/app/utils/UrlBuilder'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  joined: boolean
}
export const PUT = async (request: Request) => {
  try {
    const {accessToken} = await request.json()
    const reqUrl = new URL(request.url)
    const channel = reqUrl.searchParams.get('channel')
    const userId = reqUrl.searchParams.get('userId')

    const urlBuilder = new UrlBuilder(true)
    urlBuilder.twitch(TwitchUserEndPoints.join).channel(channel).userId(userId)

    const response = await fetch(urlBuilder.build(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, accessToken}),
    })
    const botJoinedResponse: BotJoinedResponse = await response.json()
    console.log(`Checking if ${channel} is online with response:`, botJoinedResponse)
    return NextResponse.json(botJoinedResponse, {headers: {'cache-control': 'no-store'}})
  } catch (error) {
    console.error('Error in user join route', error)
    return NextResponse.json({joined: false}, {status: 500})
  }
}
