'use client'
import Link from 'next/link'
import Image from 'next/image'
import PfpMenu from './components/pfp/PfpMenu'
import {AppBar, Toolbar, Typography} from '@mui/material'
import AppButton from './components/AppButton'
import cloudLogo from '/public/logo-no-bg.png'
import {useEffect, useState} from 'react'
import UrlBuilder, {AuthEndPoints} from './utils/UrlBuilder'
import {useLoginContext} from './LoginContext'

const checkIfLoggedIn = async (): Promise<boolean> => {
  // check if logged in
  const urlBuilder = new UrlBuilder().auth(AuthEndPoints.twitch).checkLoggedIn().build()
  const res = await fetch(urlBuilder, {
    credentials: 'include',
  })
  const data = await res.json()
  console.log('finished checkinged if logged in', data)
  return data.loggedIn
}

const Navbar = () => {
  const loginContext = useLoginContext()

  useEffect(() => {
    console.log('checking if logged in inside navbar', loginContext.loggedIn)
    loginContext.setLoggedIn(loginContext.loggedIn)
  }, [loginContext.loggedIn])

  useEffect(() => {
    checkIfLoggedIn().then(value => loginContext.setLoggedIn(value))
  }, [])

  return (
    <AppBar className="sticky">
      <Toolbar variant="dense">
        <Link className={'mr-10 bg-transparent flex items-center justify-center'} href="/">
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
        {loginContext.loggedIn ? (
          <Typography variant="h6">Logged In</Typography>
        ) : (
          <Typography variant="h6">Not Logged In</Typography>
        )}
        {loginContext.loggedIn ? (
          <PfpMenu mobileDisplay={false} />
        ) : (
          <Link href={new UrlBuilder().auth(AuthEndPoints.twitch).build()}>Sign In</Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
