import {NextResponse} from 'next/server'
import {path} from '../path'

export type BotLeaveResponse = {
  joined: boolean
  error?: any
}

export const PUT = async (req: Request, {params}: {params: {user: string}}) => {
  const {userId} = await req.json()
  console.log('params testing', userId)

  try {
    const res = await fetch(`${path}/${params.user}/leave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId}),
    })
    const botLeaveResponse: BotLeaveResponse = await res.json()
    return NextResponse.json(botLeaveResponse)
  } catch (error: any) {
    console.error('Unknown error in user leave route', error)
    return NextResponse.json({joined: false, error})
  }
}
