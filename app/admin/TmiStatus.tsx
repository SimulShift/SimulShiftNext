'use client'

import {useEffect, useState} from 'react'
import {tmiStatus} from '../api/chatbot/AdminServices'

const TmiStatus = () => {
  const [tmiStatusStr, setTmiStatusStr] = useState<string>('...Loading')

  useEffect(() => {
    tmiStatus().then(status => {
      setTmiStatusStr(status)
    })
  }, [tmiStatusStr])

  return (
    <div>
      <h1>TmiStatus: {tmiStatusStr}</h1>
    </div>
  )
}

export default TmiStatus
