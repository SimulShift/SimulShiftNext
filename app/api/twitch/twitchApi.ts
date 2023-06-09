import axios from 'axios'

interface TokenResponse {
  access_token: string
  // Add any other properties you expect in the response
}

interface UserResponse {
  data: {
    login: string
    display_name: string
    // Include other properties you want to extract from the response
  }[]
}

const getUserInfo = async (clientId: string, accessToken: string) => {
  if (!clientId) {
    throw new Error('Missing client ID')
  }
  const userUrl = 'https://api.twitch.tv/helix/users'
  const headers = {
    'Client-ID': clientId,
    Authorization: `Bearer ${accessToken}`,
  }
  const userResponse = await axios.get<UserResponse>(userUrl, {headers})
  const username = userResponse.data.data[0].login
  const channel = userResponse.data.data[0].display_name
  return {username, channel}
}
