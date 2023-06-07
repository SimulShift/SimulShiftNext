import {NextApiRequest, NextApiResponse} from 'next'
import passport from 'passport'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextApiRequest, res: NextApiResponse) {
  console.log('Method:', req.method, 'at url:', req.url)
}

export const config = {
  matcher: '/chatbot',
}
