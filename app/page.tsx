'use client'
import {Button} from '@mui/material'
import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <main>
      <Link id={styles.TwitchLink} href="https://twitch.tv/SimulShift">
        Twitch.tv/SimulShift
      </Link>
      <h1>h1 test</h1>
      <h2>h2 test</h2>
      <p> p test</p>
      <Button> test </Button>
    </main>
  )
}

export default Home
