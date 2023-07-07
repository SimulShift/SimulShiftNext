'use client'

import {signIn, useSession} from 'next-auth/react'
import TmiSwitch from './TmiSwitch'
import TmiStatus from './TmiStatus'
import {useEffect, useState} from 'react'
import {tmiStatus} from '../utils/chatbot/AdminServices'
import {Session} from 'next-auth'

//export const fetchCache = 'force-no-store'
//export const revalidate = 0 // seconds
//export const dynamic = 'force-dynamic'

type ExtendedSession = Session & {
  error?: any
}

const Admin = () => {
  const {data: session} = useSession({required: true})
  const extendedSession: ExtendedSession = session as ExtendedSession
  const [tmiStatusStr, setTmiStatusStr] = useState<string>('...Loading')

  const getTmiStatus = async () => setTmiStatusStr(await tmiStatus())
  useEffect(() => {
    getTmiStatus()
  }, [])

  useEffect(() => {
    if (extendedSession?.error) {
      console.log('/admin extendedSession.error', extendedSession.error)
      signIn() // Force sign in to hopefully resolve error
    }
  }, [extendedSession?.error])

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
