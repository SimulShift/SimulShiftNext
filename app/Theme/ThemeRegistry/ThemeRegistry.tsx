'use client'

import * as React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {keyframes} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import {NextAppDirEmotionCacheProvider} from './EmotionCache'
import {PaletteMode, Switch, Typography, useMediaQuery} from '@mui/material'
import {createTheme, ThemeOptions} from '@mui/material/styles'
import {Roboto} from 'next/font/google'
import {useEffect, useMemo, useState} from 'react'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`
export default function ThemeRegistry({children}: {children: React.ReactNode}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    //prefersDarkMode ? 'dark' : 'light',
    'dark',
  )

  const darkTheme: ThemeOptions = {
    typography: {
      fontSize: 13,
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#1f0000',
        paper: '#2c1c4d',
      },
      primary: {
        main: '#3E4BA0',
        dark: '#313b7d',
        light: '#5664bd',
      },
      secondary: {
        main: '#ff00ff',
        dark: '##8958f7',
        light: '#00FF00',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#a657f0',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({theme}) => ({
            backgroundColor: '#5933a8',
            //backgroundColor: 'inherit',
            color: '#ffffff',
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 300,
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            '&:hover': {
              backgroundColor: '#7348cc',
            },
            '& .MuiTouchRipple-child': {
              backgroundColor: 'black',
            },
            '& .MuiTouchRipple-rippleVisible': {
              opacity: 0.5,
              animationName: `${enterKeyframe}`,
              animationDuration: '550ms',
              animationTimingFunction: theme.transitions.easing.easeInOut,
            },
          }),
        },
      },
    },
  }

  const lightThemeOptions: ThemeOptions = {
    typography: {
      fontSize: 13,
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: 'light',
      background: {
        default: '#c8d0ff',
        paper: '#2c1c4d',
      },
      primary: {
        main: '#95a3ff',
        light: '#5664bd',
        dark: '#313b7d',
      },
      secondary: {
        main: '#ff00ff',
        dark: '##8958f7',
        light: '#f8f8f8',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#a657f0',
          },
        },
      },
    },
  }

  const getTheme = (mode: PaletteMode): ThemeOptions => {
    return mode === 'light' ? lightThemeOptions : darkTheme
  }

  const myTheme = useMemo(() => createTheme(getTheme(themeMode)), [themeMode])
  const [bgColor, setBgColor] = useState<string>(
    myTheme.palette.background.default,
  )

  useEffect(() => {
    setBgColor(myTheme.palette.background.default)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode])

  return (
    <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <body style={{backgroundColor: bgColor}}>
          {children}
          <Typography>Dark Mode</Typography>
          <Switch
            onChange={() =>
              setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
            }
          />
        </body>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
