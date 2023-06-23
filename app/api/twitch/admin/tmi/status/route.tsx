import {NextResponse} from 'next/server'
import {path} from '../route'
import axios, {AxiosResponse} from 'axios'

export const GET = async () => {
  try {
    console.log('path: ', path)
    const res: AxiosResponse<string> = await axios.get(`${path}/status`)
    console.log('tmiStatus in api: ', res.data)
    return NextResponse.json(res.data)
  } catch (error) {
    console.error('tmiStatus: ', error)
    throw new Error('Failed to get tmi status')
  }
}
