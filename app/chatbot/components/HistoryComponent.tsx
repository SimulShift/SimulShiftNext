import { Box, Typography } from '@mui/material';

const HistoryComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
        <Typography variant='body1' style={{fontWeight: 'bold', color: 'black'}}>Message History</Typography>
        <div>--------</div>
        <div>--------</div>
        <div>--------</div>
        <div>--------</div>
        <div>--------</div>
        <div>--------</div>
        <div>--------</div>
    </Box>
  )
}

export default HistoryComponent