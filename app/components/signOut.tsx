'use client'
import {ButtonHTMLAttributes} from 'react'

const signOut = async () => {
  const res = await fetch('/auth/signout', {
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
