import {useSession} from 'next-auth/react'
import Image from 'next/image'

const Pfp = () => {
  const {data: session} = useSession()
  return (
    <>
      {session?.user?.image && (
        <Image
          src={session.user?.image}
          alt="profile"
          width="45"
          height="45"
          style={{minWidth: '45px'}}
          className="rounded-full"
        />
      )}
    </>
  )
}
export default Pfp
