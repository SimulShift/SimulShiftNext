import {NextResponse} from 'next/server'
import UrlBuilder, {TmiEndPoints} from '@/app/utils/UrlBuilder'
import {TmiReadyState} from '@/app/services/twitch/TmiAdminServices'

export type TmiStartResponse = {
  error?: any
  readyState?: TmiReadyState
  status?: number
}

export const PUT = async (req: Request) => {
  const urlBuilder = new UrlBuilder(true)
  urlBuilder.admin().tmi(TmiEndPoints.start)
  //console.log('Starting tmi res: ', await req.json())
  try {
    const res = await fetch(urlBuilder.build(), {
      method: 'PUT',
      body: JSON.stringify(await req.json()),
      headers: {'Content-Type': 'application/json'},
    })
    const json: TmiStartResponse = await res.json()
    return NextResponse.json(json, {status: 200})
  } catch (error) {
    console.error(`Error starting tmi: `, error)
    return NextResponse.json({error: error}, {status: 500})
  }
}

export const GET = async (req: Request) => {
  return NextResponse.json({error: 'Method not allowed'}, {status: 405})
}

export const POST = async (req: Request) => {
  return NextResponse.json({error: 'Method not allowed'}, {status: 405})
}
