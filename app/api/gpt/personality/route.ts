import {NextResponse} from 'next/server'

type PersonalitiesResponse = {
  personalities: string[]
  error?: any
}
export const GET = async (req: Request, res: Response) => {
  try {
    const urlBuilder = new UrlBuilder(true)
    urlBuilder.gpt(GptEndPoints.personality)
    const res = await fetch(urlBuilder.build())
    const personalitiesResponse: PersonalitiesResponse = await res.json()
    console.log('Personalities response', personalitiesResponse)
    return NextResponse.json(personalitiesResponse)
  } catch (error) {
    console.error('Error getting personalities', error)
    return NextResponse.json({error})
  }
}

type PersonalitySetResponse = {
  message: string
  error?: any
}

export const PUT = async (request: Request) => {
  try {
    const urlBuilder = new UrlBuilder(true)
    urlBuilder.gpt(GptEndPoints.personality)

    const response = await fetch(urlBuilder.build(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await request.json()),
    })

    const personalitySetResponse: PersonalitySetResponse = await response.json()
    return NextResponse.json(personalitySetResponse, {headers: {'cache-control': 'no-store'}})
  } catch (error) {
    console.error('Unknown error in user join route', error)
    return NextResponse.json({error}, {status: 500})
  }
}
