'use client'
import {Container, Typography} from '@mui/material'
import Link from 'next/link'

import {PingRequest} from '../Protos/PingPong/PingPong_pb'
import {PingPongServiceClient} from '../Protos/PingPong/PingPongServiceClientPb'
import {useEffect, useState} from 'react'

var client = new PingPongServiceClient('http://localhost:8080')

const Home = () => {
  const [ping, setPing] = useState<boolean>(false)

  useEffect(() => {
    const request = new PingRequest()
    request.setMessage('Ping broskies!!')
    client.ping(request, {}, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        console.log('ping response', response.getOk())
        setPing(true)
      }
    })
  }, [])

  return (
    <Container maxWidth="md">
      <Link href="https://twitch.tv/SimulShift">
        <Typography variant="body1">Twitch</Typography>
        <Typography variant="body1">Ping: {ping ? 'Ponged' : 'Pinging...'}</Typography>
      </Link>
      {/* <TwitchPlayer /> */}
    </Container>
  )
}

export default Home
