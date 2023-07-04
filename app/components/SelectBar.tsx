import React, {useState} from 'react'
import {FormControl, MenuItem, Select, SelectChangeEvent} from '@mui/material'

interface Props {
  options: {text: string; value: string}[]
  onChange: (newValue: string) => void
}

const SelectBar: React.FC<Props> = ({options, onChange}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value)

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value
    setSelectedOption(newValue)
    onChange(newValue)
  }

  return (
    <FormControl>
      <Select
        labelId="select-label"
        value={selectedOption}
        onChange={handleSelectChange}
        style={{
          width: 200,
          backgroundColor: '#ebb840',
          color: 'black',
          fontWeight: 'bold',
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
        }}>
        {options.map(({text, value}) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBar
