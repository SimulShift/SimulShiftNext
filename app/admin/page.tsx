'use client'

import TmiSwitch from './TmiSwitch'
import TmiStatus from './TmiStatus'
import {useEffect, useState} from 'react'
import {tmiStatus} from '../services/twitch/TmiAdminServices'
import {useLoginContext} from '../LoginContext'

//export const fetchCache = 'force-no-store'
//export const revalidate = 0 // seconds
//export const dynamic = 'force-dynamic'

const Admin = () => {
  const loginContext = useLoginContext()
  const [tmiStatusStr, setTmiStatusStr] = useState<string>('...Loading')

  const getTmiStatus = async () => setTmiStatusStr(await tmiStatus())
  useEffect(() => {
    getTmiStatus()
  }, [])

  return (
    <div>
      <h1>Admin</h1>
      {loginContext.profile.displayName.toLocaleLowerCase() === 'therealchadgpt' && (
        <>
          <TmiStatus status={tmiStatusStr} />
          <TmiSwitch status={tmiStatusStr} setTmiStatusStr={setTmiStatusStr} />
        </>
      )}
    </div>
  )
}

export default Admin
