'use client'
import UrlBuilder, {AuthEndPoints} from '@/utils/UrlBuilder'
import {ButtonHTMLAttributes} from 'react'

const signOut = async () => {
  const url = new UrlBuilder().auth(AuthEndPoints.twitch).signout().build()
  const res = await fetch(url, {
    method: 'POST',
  })
  if (res.ok) {
    window.location.href = '/'
  }
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const SignOutButton: React.FC<ButtonProps> = ({className}) => {
  return (
    <button className={className} onClick={() => signOut()}>
      Sign out
    </button>
  )
}
export default SignOutButton
