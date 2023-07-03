import {NextResponse} from 'next/server'

type PersonalitiesResponse = {
  personalities: string[]
  error?: any
}
export const GET = async (req: Request, res: Response) => {
  try {
    const url = `${process.env.EXPRESS_BACKEND_URL}/twitch/personalities`
    const res = await fetch(url)
    const personalitiesResponse: PersonalitiesResponse = await res.json()
    console.log('Personalities response', personalitiesResponse)
    return NextResponse.json(personalitiesResponse)
  } catch (error) {
    console.error('Error getting personalities', error)
    return NextResponse.json({error})
  }
}
