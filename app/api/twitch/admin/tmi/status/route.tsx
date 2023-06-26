import {NextRequest, NextResponse} from 'next/server'
import {path} from '../path'
import axios, {AxiosResponse, AxiosError} from 'axios'
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
    const res = await fetch(cacheBuster(url), {headers: {cache: 'no-store'}})
    const data: TmiStatusResponse = await res.json()
    console.log('TmiStatusResponse: ', data)
    return NextResponse.json(data)
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      console.error(path + '/status', error.toJSON())
      return NextResponse.json({error: error.toJSON(), status: 500})
    } else {
      console.error(path + '/status', error)
      return NextResponse.json({error, status: 500})
    }
  }
}
