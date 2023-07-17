import Image from 'next/image'
import {useEffect, useState} from 'react'

const getProfile = async () => {
  const res = await fetch('/api/auth/session')
  const json = await res.json()
  return json
}

interface Session {
  user: {
    image: string
  }
}

const Pfp = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    getProfile().then(session => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {session?.user?.image && (
        <Image
          src={session.user?.image}
          alt="profile"
          width="0"
          height="0"
          sizes="100vw"
          style={{width: 50, height: 'auto'}}
          placeholder="blur"
          blurDataURL={session.user?.image}
          className="rounded-full"
        />
      )}
    </>
  )
}
export default Pfp
