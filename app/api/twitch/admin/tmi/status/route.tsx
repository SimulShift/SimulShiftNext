import {NextResponse} from 'next/server'
import {path} from '../path'
import axios, {AxiosResponse, AxiosError} from 'axios'
import {TmiReadyState} from '@/app/api/chatbot/AdminServices'

export type TmiStatusResponse = {
  error?: any
  tmiClientOnline?: boolean
  readyState?: TmiReadyState
  status?: number
}

export const GET = async () => {
  try {
    const res: AxiosResponse<TmiStatusResponse> = await axios.get(
      `${path}/status`,
    )
    console.log('TmiStatusResponse: ', res.data)
    return NextResponse.json(res.data)
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
