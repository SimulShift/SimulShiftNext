'use client'
import {Button, Container, Typography} from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <Container className="mt-24">
      {/* <Typography variant="h3"> */}
      <Link href="https://twitch.tv/SimulShift">Twitch.tv/SimulShift</Link>
      {/* </Typography> */}
      <Typography variant="h1">h1 test</Typography>
      <Typography variant="h2">h2 test</Typography>
      <Typography variant="body1"> body 1 test</Typography>
      <Typography variant="body2"> body 2 test</Typography>
      <Button> test </Button>
    </Container>
  )
}

export default Home
