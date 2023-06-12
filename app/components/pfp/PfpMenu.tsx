'use client'
import {useSession} from 'next-auth/react'
import {useState} from 'react'
import Link from 'next/link'
import {Button, ListItemText, Menu, MenuItem} from '@mui/material'
import Pfp from './Pfp'
import PfpDropdown from './PfpDropdown'

type ProfilePicDropdownProps = {
  mobileDisplay: boolean
}

export type Anchor = null | (EventTarget & HTMLButtonElement)

const PfpMenu = ({mobileDisplay}: ProfilePicDropdownProps) => {
  const {data: session} = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {session ? (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className="bg-transparent hover:bg-transparent"
            onClick={handleClick}>
            <Pfp />
          </Button>
          <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <PfpDropdown mobileDisplay={mobileDisplay} />
          </Menu>
        </>
      ) : (
        <Link href="/api/auth/signin">Sign In</Link>
      )}
    </>
  )
}

export default PfpMenu
