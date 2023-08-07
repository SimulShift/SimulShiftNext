/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from 'next/image'
import me from '/public/me.jpg'
import {Box, Typography, Button, Container} from '@mui/material'

const About = async () => {
  return (
    <Container sx={{backgroundColor: '#4d4940'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          className="rounded-full"
          src={me}
          alt="SimulShift Logo"
          placeholder="blur"
          blurDataURL="/me.jpg"
          width="150"
          height="150"
          style={{borderRadius: '100%'}}
        />
        <Typography variant="h5" style={{fontWeight: 'bold', color: 'white'}}>
          SimulShift
        </Typography>
        <Typography variant="body1" style={{color: 'white'}}>
          Game Developer, Twitch Streamer
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}
        >
          <Box style={{backgroundColor: '#555046', padding: '20px'}} sx={{borderRadius: '10px'}}>
            <Typography variant="body1" style={{color: 'white'}}>
              Welcome to my website! I'm a San Francisco State Master's student with a passion for
              coding. I primarily work in C# with Unity, but I also enjoy using Python and
              TypeScript. Join me as I continue to learn and grow in my coding journey!
            </Typography>
          </Box>
          <Button
            style={{backgroundColor: '#ae9969', display: 'flex', width: '100%', padding: '20px'}}
            href="https://www.twitch.tv/SimulShift"
          >
            <Typography variant="body1" style={{color: 'white'}}>
              Twitch
            </Typography>
          </Button>
          <Button
            style={{backgroundColor: '#ae9969', display: 'flex', width: '100%', padding: '20px'}}
          >
            <Typography variant="body1" style={{color: 'white'}}>
              Ask Me Anything
            </Typography>
          </Button>
          <Button
            style={{backgroundColor: '#ae9969', display: 'flex', width: '100%', padding: '20px'}}
            href="https://youtube.com/@SimulShiftWeb"
          >
            <Typography variant="body1" style={{color: 'white'}}>
              Watch Now on YouTube
            </Typography>
          </Button>
          <div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                columnGap: '2rem',
                paddingBottom: '1rem',
              }}
            >
              {/* TikTok */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-tiktok"
                viewBox="0 0 16 16"
              >
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
              </svg>
              {/* Twitter */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </Box>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default About
