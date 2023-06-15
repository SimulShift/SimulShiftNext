'use client'

import {createTheme, ThemeOptions} from '@mui/material/styles'
import {Roboto} from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

// When needed::: first argument is needed if you have common enterprise theme, and second argument is to override your enterprise theme.
// apply fonts to all other typography options like headings, subtitles, etc...

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#ff00ff',
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
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          background-color: #Ff1f1f;
        }
      `,
    },
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

const defaultTheme = createTheme(themeOptions)

export default defaultTheme
