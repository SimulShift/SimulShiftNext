'use client'

import {useSession} from 'next-auth/react'
import DevTools from '../chatbot/DevTools'

const Admin = () => {
  const {data: session} = useSession({required: true})

  return (
    <div>
      <h1>Admin</h1>
      {(process.env.NODE_ENV == 'development' ||
        session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt') && (
        <DevTools />
      )}
    </div>
  )
}

export default Admin
