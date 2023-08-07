'use client'
import {useState} from 'react'
import {Button, Menu, css, styled} from '@mui/material'
import Pfp from './Pfp'
import PfpDropdown from './PfpDropdown'

type ProfilePicDropdownProps = {
  mobileDisplay: boolean
}

const ProfilePicButton = styled(Button)(({theme}) => ({
  backgroundColor: 'transparent',
  color: '#ffffff',
  borderRadius: '100%', // Make the button and everything around it round
  marginTop: 5,
  textTransform: 'none',
  fontWeight: 300,
  fontSize: '1.3rem',
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to fully transparent on hover
  },
  '& .MuiTouchRipple-child': {
    backgroundColor: 'black',
  },
  '& .MuiTouchRipple-rippleVisible': {
    opacity: 0.5,
    animationDuration: '550ms',
    animationTimingFunction: theme.transitions.easing.easeInOut,
  },
}))

export type Anchor = null | (EventTarget & HTMLButtonElement)

const PfpMenu = ({mobileDisplay}: ProfilePicDropdownProps) => {
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
      <ProfilePicButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Pfp width={mobileDisplay ? 50 : 40} />
      </ProfilePicButton>
      <Menu
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <PfpDropdown mobileDisplay={mobileDisplay} />
      </Menu>
    </>
  )
}

export default PfpMenu
