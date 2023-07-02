import {OAuthConfig} from 'next-auth/providers'
import type {AuthorizationParameters} from 'openid-client'
import TwitchProvider from 'next-auth/providers/twitch'
import NextAuth, {Account, Profile, Session, User} from 'next-auth'
import {randomBytes} from 'crypto'
import {JWT} from 'next-auth/jwt'
import {AdapterUser} from 'next-auth/adapters'
import {accessTokenIsValid, refreshAccessToken} from './twitch'

export interface TwitchProfile extends Record<string, any> {
  sub: string
  preferred_username: string
  email: string
  picture: string
}

const authRedirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/twitch2`

const CustomTwitchProvider: OAuthConfig<any> = {
  wellKnown: 'https://id.twitch.tv/oauth2/.well-known/openid-configuration',
  id: 'twitch2',
  name: 'Twitch',
  type: 'oauth',
  checks: 'state',
  clientId: process.env.TWITCH_CLIENT_ID,
  //token: 'https://id.twitch.tv/oauth2/token',
  //userinfo: 'https://api.twitch.tv/helix/users',
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  authorization: {
    params: {
      client_id: process.env.TWITCH_CLIENT_ID,
      redirect_uri: authRedirectUri,
      response_type: 'code',
      scope: 'openid chat:read chat:edit user:read:email',
      userinfo: 'https://api.twitch.tv/helix/users',
      state: randomBytes(32).toString('hex'),
      claims: {
        id_token: {
          email: null,
          picture: null,
          preferred_username: null,
        },
      },
    },
  },
  idToken: true,
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.preferred_username,
      email: profile.email,
      image: profile.picture,
    }
  },
  style: {
    logo: '/twitch.svg',
    logoDark: '/twitch-dark.svg',
    bg: '#fff',
    text: '#65459B',
    bgDark: '#65459B',
    textDark: '#fff',
  },
}

type JWTCallbackParams = {
  token: JWT
  user: User | null
  account: Account | null
  profile?: Profile | undefined
  trigger?: 'signIn' | 'signUp' | 'update' | undefined
  isNewUser?: boolean | undefined
  session?: any
}

type ExtendedSession = Session & {
  accessToken?: string
  refreshToken?: string
  error?: string
}

type ExtendedJwt = JWT & {
  accessToken: string
  sub: string
  iat: number
  exp: number
  jti: string
}

type SessionCallbackParams = {
  session: ExtendedSession
  token: JWT
  user: AdapterUser
  newSession: any
  trigger: 'update'
}
const handler = NextAuth({
  debug: false,
  providers: [CustomTwitchProvider],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      return true
    },
    async jwt({token, account}: JWTCallbackParams) {
      console.log('jwt callback', 'Token:', token, '\naccount:', account)
      if (account) {
        console.log('******account********')
        // Save         console.log('refresh token:', params.account.refresh_token)
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        return token
      } else if (await accessTokenIsValid(token.accessToken as string)) {
        console.log('**********access token is valid*************')
        // lets try refreshing for testing
        return token
      } else {
        console.log('**********refreshing token*************')
        try {
          const tokens = await refreshAccessToken(token.refreshToken as string)
          return {
            ...token, // Keep the previous token properties
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token || token.refresh_token,
          }
        } catch (err) {
          console.log('error refreshing token', err)
          return {...token, error: err}
        }
      }
    },
    async session(params: SessionCallbackParams) {
      // Store the user object in the dictionary using the user's ID as the key
      if (!params.token.accessToken) throw new Error('No access token in session callback')
      params.session.accessToken = params.token.accessToken as string
      params.session.refreshToken = params.token.refreshToken as string
      params.session.error = params.token.error as string
      return params.session
    },
  },
})

export {handler as GET, handler as POST}
