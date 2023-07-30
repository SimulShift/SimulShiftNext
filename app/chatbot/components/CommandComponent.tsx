import {Box, Typography} from '@mui/material'

const CommandComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" style={{fontWeight: 'bold', color: 'black'}}>
        Command
      </Typography>
      <div>!Chad,</div>
      <div>Chad,</div>
      <div>Hey Chad,</div>
    </Box>
  )
}

export default CommandComponent
