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
          width="50"
          height="50"
          style={{minWidth: '50px'}}
          className="rounded-full"
        />
      )}
    </>
  )
}
export default Pfp
