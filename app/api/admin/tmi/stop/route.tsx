import UrlBuilder, {TmiEndPoints} from '@/app/utils/UrlBuilder'
import {NextResponse} from 'next/server'

type TmiStopResponse = {
  joined: false
  tmiRes: any
  error?: string
}

export const PUT = async () => {
  try {
    const urlBuilder = new UrlBuilder(true)
    const res = await fetch(urlBuilder.admin().tmi(TmiEndPoints.stop).build(), {
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
