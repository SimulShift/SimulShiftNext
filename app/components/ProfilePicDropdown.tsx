'use client'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import SignOutButton from './signOut'
import style from './ProfilePicDropdown.module.css'
import Divider from '@mui/material/Divider'

type ProfilePicDropdownProps = {
  mobileDisplay: boolean
}

const ProfilePicDropdown = ({mobileDisplay}: ProfilePicDropdownProps) => {
  const {data: session, status} = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      {session ? (
        <ul className="flex items-center">
          <li>
            <button
              className="bg-transparent hover:bg-transparent"
              onClick={toggleDropdown}>
              {session?.user?.image && (
                <Image
                  src={session.user?.image}
                  alt="profile"
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              )}
            </button>
            {isDropdownOpen && (
              <div className={style.dropdown}>
                <div className="p-2">
                  {mobileDisplay && (
                    <>
                      <Link className={style.linkItem} href="/">
                        Home
                      </Link>
                      <Link className={style.linkItem} href="/about">
                        About
                      </Link>
                      <Link className={style.linkItem} href="/chatbot">
                        Chat Bot
                      </Link>
                      <Link className={style.linkItem} href="/contact">
                        Contact
                      </Link>
                      <Divider />
                    </>
                  )}
                  <Link href="/profile" className={style.linkItem}>
                    Profile
                  </Link>
                  <Link href="/settings" className={style.linkItem}>
                    Settings
                  </Link>
                  <SignOutButton className="block hover:bg-pink-900 hover:text-white px-4 py-2 rounded-md" />
                </div>
              </div>
            )}
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
        </ul>
      )}
    </>
  )
}

export default ProfilePicDropdown
