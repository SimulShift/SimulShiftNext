'use client'

import {useSession} from 'next-auth/react'
import TmiSwitch from './TmiSwitch'
import TmiStatus from './TmiStatus'
import {useEffect, useState} from 'react'
import {tmiStatus} from '../api/chatbot/AdminServices'

//export const fetchCache = 'force-no-store'
//export const revalidate = 0 // seconds
//export const dynamic = 'force-dynamic'

const Admin = () => {
  const {data: session} = useSession({required: true})
  const [tmiStatusStr, setTmiStatusStr] = useState<string>('...Loading')

  const getTmiStatus = async () => setTmiStatusStr(await tmiStatus())
  useEffect(() => {
    getTmiStatus()
  }, [])

  return (
    <div>
      <h1>Admin</h1>
      {session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt' && (
        <>
          <TmiStatus status={tmiStatusStr} />
          <TmiSwitch status={tmiStatusStr} setTmiStatusStr={setTmiStatusStr} />
        </>
      )}
    </div>
  )
}

export default Admin
