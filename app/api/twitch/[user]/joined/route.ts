import {path} from '../path'
import {NextResponse} from 'next/server'

export type BotJoinedResponse = {
  message: string
  joined: boolean
}

export const GET = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    const channel = params.user
    // Extract the userId from the query parameter
    const reqUrl = new URL(request.url)
    const userId = reqUrl.searchParams.get('userId')
    console.log('Joining channel', channel, 'with userId', userId)
    const fullUrl = `${path}/${channel}/joined?userId=${userId}`
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const botJoinedResponse: BotJoinedResponse = await response.json()
    console.log(`Checking if ${channel} is online with response:`, botJoinedResponse)
    return NextResponse.json(botJoinedResponse, {
      status: 200,
    })
  } catch (error) {
    console.error('error in route api/twitch/[user]/joined', error)
    return NextResponse.json({online: false}, {status: 500})
  }
}

export const POST = async (request: Request, {params}: {params: {user: string}}) => {
  return NextResponse.json({message: 'Not implemented'}, {status: 501})
}