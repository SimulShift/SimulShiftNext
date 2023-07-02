import {NextRequest, NextResponse} from 'next/server'
import {path} from '../path'
import {TmiReadyState, cacheBuster} from '@/app/api/chatbot/AdminServices'

export type TmiStatusResponse = {
  error?: any
  tmiClientOnline?: boolean
  readyState?: TmiReadyState
  status?: number
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = `${path}/status`
    const res = await fetch(url)
    const tmiStatusResponse: TmiStatusResponse = await res.json()
    console.log('TmiStatusResponse: ', tmiStatusResponse)
    return NextResponse.json(tmiStatusResponse)
  } catch (error) {
    console.error(path + '/status', error)
    return NextResponse.json({error, status: 500})
  }
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  NextResponse.json({error: 'Not implemented', status: 501})
}
