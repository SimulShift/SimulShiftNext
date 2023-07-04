import {NextResponse} from 'next/server'

type PersonalitySetResponse = {
  message: string
  error?: any
}

export const PUT = async (request: Request, {params}: {params: {user: string}}) => {
  try {
    const {userId, accessToken} = await request.json()
    const channel = params.user
    const url = `${process.env.EXPRESS_BACKEND_URL}/twitch/personality/set`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, accessToken, channel}),
    })
    const personalitySetResponse: PersonalitySetResponse = await response.json()
    return NextResponse.json(personalitySetResponse, {headers: {'cache-control': 'no-store'}})
  } catch (error) {
    console.error('Unknown error in user join route', error)
    return NextResponse.json({error}, {status: 500})
  }
}
