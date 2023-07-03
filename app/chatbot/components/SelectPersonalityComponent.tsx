import {useEffect, useState} from 'react'
import SelectBar from '../../components/SelectBar'
import {Box, Typography} from '@mui/material'

type PersonalitiesResponse = {
  error?: any
  personalities?: string[]
  status?: number
}

type PersonalityOption = {
  text: string
  value: string
}

const fetchPersonalities = async (): Promise<string[]> => {
  const res = await fetch('api/twitch/personalities')
  const personalitiesResponse: PersonalitiesResponse = await res.json()
  if (!personalitiesResponse.personalities) {
    throw new Error('No personalities found in react component')
  }
  return personalitiesResponse.personalities
}

const SelectPersonalityComponent = () => {
  const [personalityOptions, setPersonalityOptions] = useState<PersonalityOption[]>([
    {text: 'Select An Option', value: 'none'},
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

  const onChange = (newValue: string) => {}

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
