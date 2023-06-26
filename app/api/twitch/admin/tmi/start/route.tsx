import {NextResponse} from 'next/server'
import {path} from '../path'
import axios, {AxiosResponse, AxiosError} from 'axios'

export type TmiStartResponse = {
  error?: any
  readyState?: ReadyState
  status?: number
}

export const PUT = async (req: Request) => {
  try {
    const session = await req.json()
    console.log('session in tmi/start/route.tsx: ', session)
    const response: AxiosResponse = await axios.put(`${path}/start`, {
      session,
    })
    const json: TmiStartResponse = response.data
    return NextResponse.json(json, {status: 200})
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json({error: error.toJSON()}, {status: 401})
      }
      return NextResponse.json({error: error.toJSON()}, {status: 500})
    } else {
      console.error('Error in tmi/start/route.tsx', error)
      return NextResponse.json({error}, {status: 500})
    }
  }
}

export const GET = async (req: Request) => {
  return NextResponse.json({error: 'Method not allowed'}, {status: 405})
}

export const POST = async (req: Request) => {
  return NextResponse.json({error: 'Method not allowed'}, {status: 405})
}
