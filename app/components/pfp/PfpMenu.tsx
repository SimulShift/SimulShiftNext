'use client'
import {useState} from 'react'
import Link from 'next/link'
import {Button, Menu, css, styled} from '@mui/material'
import Pfp from './Pfp'
import PfpDropdown from './PfpDropdown'

type ProfilePicDropdownProps = {
  mobileDisplay: boolean
}

interface Session {
  user: {
    name: string
  }
}

const NoBgButton = styled(Button)(
  () => css`
    background-color: transparent;
    max-height: 45px;
    max-width: 45px;
  `,
)

export type Anchor = null | (EventTarget & HTMLButtonElement)

const PfpMenu = ({mobileDisplay}: ProfilePicDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [session, setSession] = useState<Session | null>(null)

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
          <NoBgButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            sx={{marginLeft: 'auto', marginTop: 0}}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <Pfp />
          </NoBgButton>
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
