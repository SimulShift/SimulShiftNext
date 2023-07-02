import {NextResponse} from 'next/server'
import {path} from '../path'

export type BotLeaveResponse = {
  joined: boolean
  error?: any
}

export const DELETE = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    const res = await fetch(`${path}/${params.user}/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const botLeaveResponse: BotLeaveResponse = await res.json()
    return NextResponse.json(botLeaveResponse)
  } catch (error: any) {
    console.error('Unknown error in user leave route', error)
    return NextResponse.json({joined: false, error})
  }
}
