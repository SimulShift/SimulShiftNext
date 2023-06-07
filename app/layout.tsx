import Navbar from './Navbar'
import './globals.css'
import {Inter} from 'next/font/google'
import Provider from './components/Provider'
import {ReactNode} from 'react'
const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'SimulShift',
  description:
    'SimulShift is a streamer who is building a chatbot for twitch and eventually other platforms such as Discord.',
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </Provider>
  )
}
