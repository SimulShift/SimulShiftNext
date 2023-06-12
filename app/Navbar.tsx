'use client'
import Link from 'next/link'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import PfpMenu from './components/pfp/PfpMenu'
import style from './nav.module.css'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <nav>
      <ul className={style.navUl}>
        <Link
          className={'bg-transparent flex items-center justify-center'}
          href="/">
          <Image src="/logo-no-bg.png" alt="logo" width="50" height="50" />
        </Link>
        <li className={style.navLi}>
          <Link href="/">Home</Link>
        </li>
        <li className={style.navLi}>
          <Link href="/about">About</Link>
        </li>
        <li className={style.navLi}>
          <Link href="/chatbot">Chat Bot</Link>
        </li>
        <li className={style.navLi}>
          <Link href="/contact">Contact</Link>{' '}
        </li>
        {session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt' && (
          <li className={style.navLi}>
            <Link href="/admin">Admin</Link>
          </li>
        )}
        {session?.user ? (
          <PfpMenu mobileDisplay={false} />
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
