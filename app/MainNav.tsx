'use client'
import Navbar from './Navbar'
import PfpMenu from './components/pfp/PfpMenu'
import {useEffect, useState} from 'react'

const MainNav = () => {
  const [isPhoneSize, setIsPhoneSize] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneSize(window.innerWidth <= 600) // Adjust the width as per your target iPhone size
    }
    handleResize() // Check the initial size

    // Attach the event listener to update the size when the window is resized
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures the effect runs only once

  return (
    <>
      {isPhoneSize ? (
        <div className="flex">
          <h1 className="text-lg m-5 ml-10">SimulShift</h1>
          <PfpMenu mobileDisplay={isPhoneSize} />
        </div>
      ) : (
        <Navbar />
      )}
    </>
  )
}

export default MainNav
