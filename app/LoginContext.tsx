'use client'
import {TwitchUserData, getProfile} from './components/pfp/pfpHelpers'
import {createContext, useContext, useEffect, useState} from 'react'

const LoginContext = createContext({
  loggedIn: false,
  profile: getProfile(),
  setLoggedIn: (value: boolean) => {},
})

export const useLoginContext = () => {
  return useContext(LoginContext)
}

const LoginContextProvider = ({children}: {children: React.ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    console.log('checking if logged in inside context', loggedIn)
  }, [loggedIn])

  return (
    <LoginContext.Provider value={{loggedIn, profile: getProfile(), setLoggedIn}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider
