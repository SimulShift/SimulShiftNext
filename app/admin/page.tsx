'use client'

import {useSession} from 'next-auth/react'
import TmiSwitch from './TmiSwitch'
import TmiStatus from './TmiStatus'
import {useEffect, useState} from 'react'
import {tmiStatus} from '../api/chatbot/AdminServices'

const Admin = () => {
  const {data: session} = useSession({required: true})
  const [tmiStatusStr, setTmiStatusStr] = useState<string>('...Loading')

  const getTmiStatus = async () => {
    setTmiStatusStr(await tmiStatus())
  }

  // useEffect check if tmiOnline
  useEffect(() => {
    console.log('useEffect tmiStatusStr')
    getTmiStatus()
  }, [tmiStatusStr])

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
