import React, { useState } from 'react';
import { Switch, Tooltip } from '@mui/material';

interface Props {
    activeToggle?: string;
    inactiveToggle?: string;
}

const ToggleSwitch: React.FC<Props> = ({activeToggle, inactiveToggle}) => {
const defaultActiveToggle = activeToggle ?? 'Switched On'
const defaultInactiveToggle = inactiveToggle ?? 'Switched Off'
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <Tooltip title={checked ? defaultActiveToggle : defaultInactiveToggle} arrow>
      <Switch checked={checked} onChange={handleChange} sx={{
        '& .MuiSwitch-thumb': {
            backgroundColor: 'white',
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(16px)'
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#ddd'
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#7ed957'
          },
      }}/>
    </Tooltip>
  );
};

export default ToggleSwitch;
