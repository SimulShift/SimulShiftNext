'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import PfpMenu from './components/pfp/PfpMenu'
import {AppBar, Toolbar} from '@mui/material'
import AppButton from './components/AppButton'
import cloudLogo from '/public/logo-no-bg.png'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <AppBar className="sticky">
      <Toolbar variant="dense">
        <Link
          className={'mr-10 bg-transparent flex items-center justify-center'}
          href="/">
          <Image
            src={cloudLogo}
            alt="logo"
            placeholder="blur"
            blurDataURL="/logo-no-bg.png"
            width="0"
            height="0"
            sizes="100vw"
            style={{width: 50, height: 'auto'}}
          />
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
