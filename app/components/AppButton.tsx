'use client'

import {Button} from '@mui/material'
import {Url} from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import {styled} from '@mui/system'
import {css} from '@emotion/react'

const StyledButton = styled(Button)(
  () => css`
    background-color: inherit;
    /* Add more styles here */
  `,
)

type AppItemProps = {
  children: React.ReactNode
  href: Url
}

const AppButton = ({children, href}: AppItemProps) => {
  return (
    <Link href={href}>
      <StyledButton>{children}</StyledButton>
    </Link>
  )
}

export default AppButton
