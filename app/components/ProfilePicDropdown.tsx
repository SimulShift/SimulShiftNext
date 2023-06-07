'use client'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import SignOutButton from './signOut'
import style from './ProfilePicDropdown.module.css'

const ProfilePicDropdown = () => {
  const {data: session, status} = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <ul className="flex items-center">
      {session ? (
        <>
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
        </>
      ) : (
        <li>
          <Link href="/api/auth/signin">Sign In</Link>
        </li>
      )}
    </ul>
  )
}

export default ProfilePicDropdown
