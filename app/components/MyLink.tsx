// components/MyLink.tsx
import {LinkProps, Link as MuiLink} from '@mui/material'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
// Defining the CustomNextLink
export type CustomNextLinkProps = Omit<NextLinkProps, 'href'> & {
  _href: NextLinkProps['href']
}
export const CustomNextLink = ({_href, ...props}: CustomNextLinkProps) => {
  return <NextLink href={_href} {...props} />
}
// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = LinkProps<typeof NextLink>
// remove both href properties
// and define a new href property using NextLinkProps
type MyLinkProps = Omit<CombinedLinkProps, 'href'> & {
  href: NextLinkProps['href']
}
const MyLink = ({href, ...props}: MyLinkProps) => {
  // use _href props of CustomNextLink to set the href
  return (
    <MuiLink sx={{textDecoration: 'none'}} {...props} component={CustomNextLink} _href={href} />
  )
}
export default MyLink
