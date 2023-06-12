//import {Roboto} from 'next/font/google'
import Provider from './components/Provider'
import {ReactNode} from 'react'
import './globals.css'
import MainNav from './MainNav'
import ThemeRegistry from './Theme/ThemeRegistry/ThemeRegistry'

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
        <ThemeRegistry>
          <MainNav />
          {children}
        </ThemeRegistry>
      </html>
    </Provider>
  )
}
