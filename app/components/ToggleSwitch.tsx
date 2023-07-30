import React, {useState} from 'react'
import {Switch, Tooltip} from '@mui/material'

interface Props {
  activeToggle?: string
  inactiveToggle?: string
}

const ToggleSwitch: React.FC<Props> = ({activeToggle, inactiveToggle}) => {
  const defaultActiveToggle = activeToggle ?? 'Switched On'
  const defaultInactiveToggle = inactiveToggle ?? 'Switched Off'
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(prevChecked => !prevChecked)
  }

  return (
    <Tooltip title={checked ? defaultActiveToggle : defaultInactiveToggle} arrow>
      <Switch
        checked={checked}
        onChange={handleChange}
        sx={{
          width: '125px',
          height: '100%',
          '& .MuiSwitch-thumb': {
            backgroundColor: 'white',
            height: '35px',
            width: '35px',
            transform: 'translateX(6px)',
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(60px)',
          },
          '& .MuiSwitch-track': {
            transform: 'translateY(-5px)',
            backgroundColor: '#ddd',
            height: '40px',
            borderRadius: '50px',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#7ed957',
          },
        }}
      />
    </Tooltip>
  )
}

export default ToggleSwitch
