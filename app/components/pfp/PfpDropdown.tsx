import {useSession} from 'next-auth/react'
import Link from 'next/link'
import {
  Divider,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Switch,
  Typography,
} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import SignOutButton from '../signOut'
import {Anchor} from './PfpMenu'
import AppButton from '../AppButton'
import {useContext} from 'react'
import {setThemeModeContext} from '@/app/Theme/ThemeRegistry'

type PfpDropdown = {
  mobileDisplay: boolean
}

const PfpDropdown = ({mobileDisplay}: PfpDropdown) => {
  const setThemeMode = useContext(setThemeModeContext)
  const {data: session} = useSession()
  return (
    <>
      {mobileDisplay && (
        <>
          {session?.user && (
            <MenuItem sx={{color: 'lightblue'}}>{session.user.name}</MenuItem>
          )}
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about">About</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/chatbot">Chat Bot</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/contact">Contact</Link>
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem>
        <Typography>Light Mode</Typography>
        <Switch
          onChange={() =>
            setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'))
          }
          sx={{ml: 1}}
        />
      </MenuItem>
      <MenuItem>
        <ListItemText>
          <Link href="/profile">Profile</Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <Link href="/settings">Settings</Link>
      </MenuItem>
      {session?.user?.name?.toLocaleLowerCase() === 'therealchadgpt' && (
        <AppButton href="/admin">Admin</AppButton>
      )}
      <MenuItem>
        <SignOutButton className="block hover:bg-pink-900 hover:text-white px-4 py-2 rounded-md" />
      </MenuItem>
    </>
  )
}

export default PfpDropdown