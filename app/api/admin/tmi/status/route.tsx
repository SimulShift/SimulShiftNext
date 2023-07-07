import {NextRequest, NextResponse} from 'next/server'
import {TmiReadyState} from '@/app/utils/twitch/TmiAdminServices'
import UrlBuilder, {TmiEndPoints} from '@/app/utils/UrlBuilder'

export type TmiStatusResponse = {
  error?: any
  tmiClientOnline?: boolean
  readyState?: TmiReadyState
  status?: number
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const urlBuilder = new UrlBuilder(true)
  urlBuilder.admin().tmi(TmiEndPoints.status)

  try {
    const res = await fetch(urlBuilder.build())
    const tmiStatusResponse: TmiStatusResponse = await res.json()
    console.log('TmiStatusResponse: ', tmiStatusResponse)
    return NextResponse.json(tmiStatusResponse)
  } catch (error) {
    console.error(`Error fetching tmi status: `, error)
    return NextResponse.json({error, status: 500})
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  NextResponse.json({error: 'Not implemented', status: 501})
}
