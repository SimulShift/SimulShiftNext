import {NextResponse} from 'next/server'

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const targetUrl = url.searchParams.get('url')
  const userId = url.searchParams.get('userId')
  console.log('url:', targetUrl, 'userId:', userId)
  if (!targetUrl || !userId)
    return NextResponse.json({message: 'Missing url or userId'}, {status: 400})

  try {
    const fullUrl = new URL(targetUrl)
    fullUrl.searchParams.append('userId', userId)

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return NextResponse.json(json, {
      status: 200,
    })
  } catch (error) {
    console.log(`Error for url: ${url} and userId: ${userId}`, error)
    return NextResponse.json({error, url, userId}, {status: 500})
  }
}

export const POST = async (request: Request, {params}: {params: {user: string}}) => {
  return NextResponse.json({message: 'Not implemented'}, {status: 501})
}
