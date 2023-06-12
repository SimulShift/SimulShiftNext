'use client'

import * as React from 'react'
import {PaletteOptions, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {NextAppDirEmotionCacheProvider} from './EmotionCache'
import {Switch, Typography, useMediaQuery} from '@mui/material'
import {createTheme, ThemeOptions} from '@mui/material/styles'
import {Roboto} from 'next/font/google'
import {useEffect, useState} from 'react'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function ThemeRegistry({children}: {children: React.ReactNode}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
  )

  // When needed::: first argument is needed if you have common enterprise theme, and second argument is to override your enterprise theme.
  // apply fonts to all other typography options like headings, subtitles, etc...

  /*
  const darkPalette: PaletteOptions = {
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
      light: '#f8f8f8',
    },
  }

  const lightPalette: PaletteOptions = {
    mode: 'light',
    background: {
      default: '#1f00ff',
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
      light: '#f8f8f8',
    },
  }
  */

  const themeOptions: ThemeOptions = {
    typography: {
      fontSize: 16,
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      background: {
        default: themeMode === 'light' ? '#1f00ff' : '#1f0000',
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
        light: '#f8f8f8',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            padding: '0.5rem 1rem',
          },
        },
      },
    },
  }

  const myTheme = createTheme(themeOptions)
  return (
    <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <body>
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
