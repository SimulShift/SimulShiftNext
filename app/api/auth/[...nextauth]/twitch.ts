import {JWT} from 'next-auth/jwt'

export const accessTokenIsValid = async (accessToken: string): Promise<boolean> => {
  try {
    const res = await fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    const json = await res.json()
    //console.log('*******validate twitch api response***********\n', json)
    if (json.status) {
      if (json.status == 401) {
        //'This token is invalid: ' + resp.message;
        console.log('This token is invalid: ' + json.message)
        return false
      }
    }
    if (json.client_id && json.client_id == process.env.TWITCH_CLIENT_ID) {
      /*
      console.log(
        'This token is valid for the client id in the .env file',
        process.env.TWITCH_CLIENT_ID,
      )*/
      return true
    } else {
      console.log('This token is not valid for the client id in the .env file')
      return false
    }
  } catch (error) {
    console.error('Error validating token', error)
    return false
  }
}

export const refreshAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID ?? '',
        client_secret: process.env.TWITCH_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      method: 'POST',
    })
    const tokens = await response.json()
    if (!response.ok) throw tokens
    return tokens
  } catch (error) {
    throw error
  }
}
