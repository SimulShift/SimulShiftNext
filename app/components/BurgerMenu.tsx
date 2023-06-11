'use client'
import Image from 'next/image'
import React, {useState} from 'react'
import style from '../Nav.module.css'
import {useSession} from 'next-auth/react'

const BurgerMenu = () => {
  const {data: session, status} = useSession()

  return <></>
}

export default BurgerMenu
