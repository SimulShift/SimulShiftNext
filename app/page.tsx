'use client'
import {Container, Typography} from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Link href="https://twitch.tv/SimulShift">
        <Typography variant="body1">Twitch</Typography>
      </Link>
      {/* <TwitchPlayer /> */}
    </Container>
  )
}

export default Home
