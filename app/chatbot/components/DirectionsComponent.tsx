import { Box, Typography } from '@mui/material';

const DirectionsComponent = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '65px'
    }}
  >
      <Typography variant='body1' style={{fontWeight: 'bold', color: 'black'}}>Directions</Typography>
  </Box>
  )
}

export default DirectionsComponent