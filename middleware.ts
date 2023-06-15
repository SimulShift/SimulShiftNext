import {NextApiRequest, NextApiResponse} from 'next'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextApiRequest, res: NextApiResponse) {
  console.log('Method:', req.method, 'at url:', req.url)
}

export const config = {
  matcher: '/chatbot',
}
