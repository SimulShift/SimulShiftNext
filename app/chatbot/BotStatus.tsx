import {Typography} from '@mui/material'

type BotStatusProps = {
  online: boolean
}

const BotStatus = ({online}: BotStatusProps) => {
  return <Typography>{online ? 'Chat Bot is ON' : 'Chat Bot is OFF'}</Typography>
}

export default BotStatus
