import { Box, Typography } from '@mui/material';

const CreatePersonalityComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80px'
      }}
    >
      <Typography variant='body1' style={{fontWeight: 'bold', color: 'black'}}>Create your own Personality</Typography>
    </Box>
  )
}

export default CreatePersonalityComponent