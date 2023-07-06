import {NextResponse} from 'next/server'

export const GET = async (req: Request, res: Response) => {
  const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`)
  const data = await fetchRes.json()
  console.log('backend fetch test', data)
  return NextResponse.json({data})
}
