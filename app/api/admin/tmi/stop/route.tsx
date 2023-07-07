import {NextResponse} from 'next/server'
import {path} from '../path'

type TmiStopResponse = {
  joined: false
  tmiRes: any
  error?: string
}

export const PUT = async () => {
  try {
    const res = await fetch(`${path}/stop`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: TmiStopResponse = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('stopTmi: ', error)
    return NextResponse.json({joined: false, error: 'Failed to stop tmi'})
  }
}
