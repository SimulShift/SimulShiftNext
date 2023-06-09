import {NextRequest} from 'next/server'
import TmiBot from '../../../twitch/TmiBot'
import {redirectUri} from '../../constants'
import axios, {AxiosError, AxiosResponse} from 'axios'

// Step 1: Redirect the user to the Twitch authorization URL
// Step 2: Handle the authorization callback

export const GET = (req: NextRequest) => {
  const code: string | null = req.nextUrl.searchParams.get('code')

  if (!code) {
    return new Response('No code provided!', {status: 400})
  }

  if (!redirectUri) {
    return new Response('No redirect URI provided!', {status: 400})
  }

  getAuthToken(code, redirectUri)
  TmiBot.twitchBot = new TmiBot(code)
  return new Response('Authorization successful! You can close this window.')
}

const getAuthToken = async (
  authCode: string,
  redirectUri: string,
): Promise<string> => {
  try {
    const response: AxiosResponse<TokenResponse> | void =
      await axios.post<TokenResponse>(
        'https://id.twitch.tv/oauth2/token',
        null,
        {
          params: {
            client_id: this.chadClientId,
            client_secret: this.chadClientSecret,
            code: authCode,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
          },
        },
      )
    const authToken = response.data.access_token
    if (!authToken) {
      throw new Error('No auth token found')
    }
    return response.data.access_token
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    if (axios.isAxiosError(error)) {
      if (axiosError.response) {
        console.error('Error status:', axiosError.response.status)
        console.error('Error message:', axiosError.response.data)
      } else {
        console.error('Error:', axiosError.message)
      }
    } else {
      console.error('Unknown error occurred:', error)
    }
    throw error
  }
}
