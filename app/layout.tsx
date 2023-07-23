import {ReactNode} from 'react'
import './globals.css'
import MainNav from './MainNav'
import ThemeRegistry from './Theme/ThemeRegistry'
import LoginContextProvider from './LoginContext'

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
    <html lang="en">
      <ThemeRegistry>
        <LoginContextProvider>
          <MainNav />
          {children}
        </LoginContextProvider>
      </ThemeRegistry>
    </html>
  )
}
