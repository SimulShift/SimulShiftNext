import {useEffect, useState} from 'react'
import SelectBar from '../../components/SelectBar'
import {Box, Typography} from '@mui/material'
import {Personality, fetchPersonalities} from '@/app/services/gpt/UserServices'

type PersonalityOption = {
  text: Personality
  value: Personality
}

const SelectPersonalityComponent = () => {
  const [personalityOptions, setPersonalityOptions] = useState<PersonalityOption[]>([
    {text: Personality.Helpful, value: Personality.Helpful},
  ])

  useEffect(() => {
    fetchPersonalities().then(personalities => {
      const options = personalities.map(personality => ({
        text: personality,
        value: personality,
      }))
      setPersonalityOptions(options)
    })
  }, [])

  const onChange = (newValue: string) => {
    console.log('Selected personality: ', newValue)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="body1" style={{fontWeight: 'bold', color: 'black'}}>
        Select
      </Typography>
      <SelectBar onChange={onChange} options={personalityOptions} />
    </Box>
  )
}

export default SelectPersonalityComponent
