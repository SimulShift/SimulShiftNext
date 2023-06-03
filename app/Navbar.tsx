import Link from 'next/link'
import Image from 'next/image'
import './navbar.css'

export default function Navbar() {
  return (
    <nav>
      <Image src="/logo-no-bg.png" alt="logo" width="50" height="50" />
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
          <h2>
            <Link href="/contact">Contact</Link>
          </h2>
        </li>
      </ul>
    </nav>
  )
}
