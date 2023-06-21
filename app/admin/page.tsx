'use client'

import {useSession} from 'next-auth/react'
import TmiSwitch from './TmiSwitch'
import TmiStatus from './TmiStatus'

const Admin = () => {
  const {data: session} = useSession({required: true})

  return (
    <div>
      <h1>Admin</h1>
      {(process.env.NODE_ENV == 'development' ||
        session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt') && (
        <>
          <TmiStatus />
          <TmiSwitch />
        </>
      )}
    </div>
  )
}

export default Admin
