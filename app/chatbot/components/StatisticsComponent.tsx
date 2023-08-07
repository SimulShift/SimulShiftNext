import {Box, Typography} from '@mui/material'

const StatisticsComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" style={{fontWeight: 'bold', color: 'black'}}>
        Statistics
      </Typography>
      <div>1. Number of Messages</div>
      <div>2. Queries Left Command</div>
    </Box>
  )
}

export default StatisticsComponent
