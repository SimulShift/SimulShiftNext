import {OAuthConfig} from 'next-auth/providers'
import type {AuthorizationParameters} from 'openid-client'
import TwitchProvider from 'next-auth/providers/twitch'
import NextAuth, {Account, Profile, Session, User} from 'next-auth'
import {randomBytes} from 'crypto'
import {JWT} from 'next-auth/jwt'
import {AdapterUser} from 'next-auth/adapters'

export interface TwitchProfile extends Record<string, any> {
  sub: string
  preferred_username: string
  email: string
  picture: string
}

//const authRedirectUri = 'http://localhost:3000/api/auth/callback/twitch'
const authRedirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/twitch`
console.log('authRedirectUri', authRedirectUri)

const CustomTwitchProvider: OAuthConfig<any> = {
  wellKnown: 'https://id.twitch.tv/oauth2/.well-known/openid-configuration',
  id: 'twitch',
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
}

// JWT &
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
  debug: true,
  providers: [CustomTwitchProvider],
  callbacks: {
    async jwt(params: JWTCallbackParams) {
      if (params.account?.access_token) {
        console.log('jwt params', params)
        params.token.accessToken = params.account.access_token
      }
      return params.token
    },
    async session(params: SessionCallbackParams) {
      // Store the user object in the dictionary using the user's ID as the key
      if (!params.token.accessToken)
        throw new Error('No access token in session callback')
      params.session.accessToken = params.token.accessToken as string
      return params.session
    },
  },
})

export {handler as GET, handler as POST}
