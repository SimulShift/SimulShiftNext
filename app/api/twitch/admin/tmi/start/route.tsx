import {NextResponse} from 'next/server'
import {path} from '../path'
import axios, {AxiosResponse} from 'axios'
import {TmiStatusResponse} from '@/app/api/chatbot/AdminServices'

export const PUT = async (req: Request) => {
  try {
    const session = await req.json()
    console.log('session: ', session)
    const expiration = new Date(session.expires)
    const pstExpiration = expiration.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    })
    console.log('session expiration:', pstExpiration)
    const response: AxiosResponse = await axios.put(`${path}/start`, {
      session,
    })
    const json: TmiStatusResponse = response.data
    console.log('json: ', json)
    return NextResponse.json(json)
  } catch (error) {
    console.error('startTmi: ', error)
    return NextResponse.error()
  }
}
