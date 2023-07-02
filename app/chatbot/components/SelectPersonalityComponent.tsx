import SelectBar from '../../components/SelectBar';
import { Box, Typography } from '@mui/material';

const SelectPersonalityComponent = () => {
const personalityOptions = [{text: 'Personality', value: 'personality'}, {text: 'Chad', value: 'chad'}]
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
        <Typography variant='body1' style={{fontWeight: 'bold', color: 'black'}}>Select</Typography>
        <SelectBar options={personalityOptions}/>
    </Box>
  )
}

export default SelectPersonalityComponent