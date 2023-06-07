'use client'
import {signOut} from 'next-auth/react'
import {ButtonHTMLAttributes} from 'react'

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
