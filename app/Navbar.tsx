'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import PfpMenu from './components/pfp/PfpMenu'
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material'
import AppItem from './components/AppItem'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <AppBar>
      <Toolbar>
        <Link
          className={'mr-10 bg-transparent flex items-center justify-center'}
          href="/">
          <Image src="/logo-no-bg.png" alt="logo" width="50" height="50" />
        </Link>
        <AppItem href="/">Home</AppItem>
        <AppItem href="/about">About</AppItem>
        <Button>
          <Link href="/chatbot">Chat Bot</Link>{' '}
        </Button>
        <Button>
          <Link href="/contact">Contact</Link>{' '}
        </Button>
        {session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt' && (
          <Link href="/admin">Admin</Link>
        )}
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
