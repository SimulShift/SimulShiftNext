import Image from 'next/image'
import {getProfile} from './pfpHelpers'

export type TwitchUserData = {
  id: string
  login: string
  displayName: string
  image: string
  createdAt: string
}

type PfpProps = {
  width?: number
}

const Pfp = ({width}: PfpProps) => {
  if (!getProfile().image) return null
  console.log('Getting image porofile', getProfile().image, 'with width', width)

  return (
    <>
      {getProfile() && (
        <Image
          src={getProfile().image}
          alt="profile"
          width="0"
          height="0"
          sizes="100vw"
          style={{width: width, height: 'auto'}}
          placeholder="blur"
          blurDataURL={getProfile().image}
          className="rounded-full"
        />
      )}
    </>
  )
}

export default Pfp
