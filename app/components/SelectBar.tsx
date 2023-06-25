import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('personality');

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  return (
    <FormControl>
      {/* <InputLabel id="select-label">Select an option</InputLabel> */}
      <Select
        labelId="select-label"
        value={selectedOption}
        onChange={() => handleOptionChange}
        style={{ 
            width: 200, 
            backgroundColor: '#ebb840',
            color: 'black',
            fontWeight: 'bold'
        }}
        sx={{
            '& .MuiSelect-icon': {
                '&::after': {
                    backgroundColor: 'white',
                },
                '&::before': {
                    backgroundColor: 'white',
                },
              backgroundColor: 'white',
              color: '#ebb840',
            },
          }}
      >
        <MenuItem value="personality">Personality</MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
        <MenuItem value="option4">Option 4</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBar;

