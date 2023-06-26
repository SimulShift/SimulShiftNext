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
