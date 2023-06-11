'use client'
import Link from 'next/link'
import Image from 'next/image'
import ProfilePicDropdown from './components/ProfilePicDropdown'
import {useSession} from 'next-auth/react'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <nav>
      <Link
        className={'bg-transparent flex items-center justify-center'}
        href="/">
        <Image src="/logo-no-bg.png" alt="logo" width="50" height="50" />
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/chatbot">Chat Bot</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>{' '}
        </li>
        {session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt' && (
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        )}
        {session?.user ? (
          <>
            <li>
              <p className="dark:text-sky-300">{session.user.name}</p>
            </li>
            <li>
              <ProfilePicDropdown mobileDisplay={false} />
            </li>
          </>
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
