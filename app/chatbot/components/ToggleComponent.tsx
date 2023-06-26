import { Box, Typography } from '@mui/material';
import ToggleSwitch from '../../components/ToggleSwitch';

const ToggleComponent = () => {
    const activeToggle = 'Your Chatbot is Online! Give chad  a command in your twitch channel'
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
        <Typography variant='body1' style={{fontWeight: 'bold', color: 'black'}}>On/Off</Typography>
        <ToggleSwitch activeToggle={activeToggle}/>
    </Box>
  )
}

export default ToggleComponent