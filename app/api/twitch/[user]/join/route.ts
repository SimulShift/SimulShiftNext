import {path} from '../path'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  joined: boolean
}
export const PUT = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    console.log('Joining channel', params.user)
    const channel = params.user
    const response = await fetch(`${path}/${channel}/join`, {
      method: 'PUT',
    })
    const botJoinedResponse: BotJoinedResponse = await response.json()
    console.log(`Checking if ${channel} is online with response:`, botJoinedResponse)
    return NextResponse.json(botJoinedResponse, {headers: {'cache-control': 'no-store'}})
  } catch (error) {
    console.error('Unknown error in user join route', error)
    return NextResponse.json({joined: false}, {status: 500})
  }
}
