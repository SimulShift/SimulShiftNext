import {path} from '../path'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  joined: boolean
}
export const PUT = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    console.log('Joining channel', params.user)
    const {userId, accessToken} = await request.json()
    const channel = params.user
    const response = await fetch(`${path}/${channel}/join`, {
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
    console.error('Unknown error in user join route', error)
    return NextResponse.json({joined: false}, {status: 500})
  }
}
