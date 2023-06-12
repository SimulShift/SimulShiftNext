import {useSession} from 'next-auth/react'
import style from './pfp.module.css'
import Link from 'next/link'
import {Divider, Menu, MenuItem, MenuList, Paper} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import SignOutButton from '../signOut'
import {Anchor} from './PfpMenu'

type PfpDropdown = {
  mobileDisplay: boolean
}

const PfpDropdown = ({mobileDisplay}: PfpDropdown) => {
  const {data: session} = useSession()
  return (
    <>
      {mobileDisplay && (
        <>
          {session?.user && (
            <MenuItem sx={{color: 'lightblue'}}>{session.user.name}</MenuItem>
          )}
          <MenuItem>
            <Link className={style.linkItem} href="/">
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={style.linkItem} href="/about">
              About
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={style.linkItem} href="/chatbot">
              Chat Bot
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={style.linkItem} href="/contact">
              Contact
            </Link>
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem>
        <ListItemText>
          <Link href="/profile" className={style.linkItem}>
            Profile
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <Link href="/settings" className={style.linkItem}>
          Settings
        </Link>
      </MenuItem>
      <MenuItem>
        <SignOutButton className="block hover:bg-pink-900 hover:text-white px-4 py-2 rounded-md" />
      </MenuItem>
    </>
  )
}

export default PfpDropdown
