import UrlBuilder, {GptEndPoints} from '@/utils/UrlBuilder'

export enum Personality {
  Helpful = 'Helpful',
  Chad = 'Chad',
  UwU = 'UwU',
  Sarcastic = 'Carcastic',
}

export type PersonalitiesResponse = {
  error?: any
  personalities: Personality[]
  status?: number
}

export const fetchPersonalities = async (): Promise<Personality[]> => {
  const urlBuilder = new UrlBuilder()
  urlBuilder.gpt(GptEndPoints.personality)
  try {
    const res = await fetch(urlBuilder.build())
    const personalitiesResponse: PersonalitiesResponse = await res.json()
    return personalitiesResponse.personalities
  } catch (error) {
    console.error('Error fetching personalities', error)
    return []
  }
}
