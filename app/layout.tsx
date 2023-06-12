import './globals.css'
import {Roboto} from 'next/font/google'
import Provider from './components/Provider'
import {ReactNode} from 'react'
import MainNav from './MainNav'

export const metadata = {
  title: 'SimulShift',
  description:
    'SimulShift is a streamer who is building a chatbot for twitch and eventually other platforms such as Discord.',
}
interface MyAppProps {
  children: ReactNode
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: MyAppProps) {
  return (
    <Provider>
      <html lang="en">
        <body className={roboto.className}>
          <MainNav />
          {children}
        </body>
      </html>
    </Provider>
  )
}
