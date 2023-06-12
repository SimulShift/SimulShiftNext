import './globals.css'
import {Inter} from 'next/font/google'
import Provider from './components/Provider'
import {ReactNode} from 'react'
import MainNav from './MainNav'
const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'SimulShift',
  description:
    'SimulShift is a streamer who is building a chatbot for twitch and eventually other platforms such as Discord.',
}
interface MyAppProps {
  children: ReactNode
}

export default function RootLayout({children}: MyAppProps) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className}>
          <MainNav />
          {children}
        </body>
      </html>
    </Provider>
  )
}
