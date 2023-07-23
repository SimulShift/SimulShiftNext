import Image from 'next/image'
import {getProfile} from './pfpHelpers'

export type TwitchUserData = {
  id: string
  login: string
  displayName: string
  image: string
  createdAt: string
}

const Pfp = () => {
  if (!getProfile().image) return null
  console.log('Getting image porofile', getProfile().image)

  return (
    <>
      {getProfile() && (
        <Image
          src={getProfile().image}
          alt="profile"
          width="0"
          height="0"
          sizes="100vw"
          style={{width: 50, height: 'auto'}}
          placeholder="blur"
          blurDataURL={getProfile().image}
          className="rounded-full"
        />
      )}
    </>
  )
}
export default Pfp
