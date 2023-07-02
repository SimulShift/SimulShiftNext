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
    //const res = await fetch(cacheBuster(url), {headers: {cache: 'no-store'}})
    const res = await fetch(url)
    const data: TmiStatusResponse = await res.json()
    console.log('TmiStatusResponse: ', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error(path + '/status', error)
    return NextResponse.json({error, status: 500})
  }
}

//export const POST = async (req: Request) => {
//  return NextResponse.json({error: 'Method not allowed'}, {status: 405})
//}
