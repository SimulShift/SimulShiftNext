'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import PfpMenu from './components/pfp/PfpMenu'
import {AppBar, Toolbar} from '@mui/material'
import AppButton from './components/AppButton'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <AppBar className="sticky">
      <Toolbar variant="dense">
        <Link
          className={'mr-10 bg-transparent flex items-center justify-center'}
          href="/">
          <Image src="/logo-no-bg.png" alt="logo" width="50" height="50" />
        </Link>
        <AppButton href="/">Home</AppButton>
        <AppButton href="/about">About</AppButton>
        <AppButton href="/chatbot">Chat Bot</AppButton>
        <AppButton href="/contact">Contact</AppButton>
        {session?.user ? (
          <PfpMenu mobileDisplay={false} />
        ) : (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
