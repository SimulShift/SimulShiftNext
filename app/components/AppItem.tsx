import {Typography} from '@mui/material'
import MyButton from './MyButton'
import {Url} from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type AppItemProps = {
  children: React.ReactNode
  href: Url
}

const AppItem = ({children, href}: AppItemProps) => {
  return (
    <Link href={href}>
      <MyButton>
        <Typography color="white">{children}</Typography>
      </MyButton>
    </Link>
  )
}

export default AppItem
