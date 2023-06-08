import {OAuthConfig} from 'next-auth/providers'
import type {AuthorizationParameters} from 'openid-client'
import TwitchProvider from 'next-auth/providers/twitch'
import NextAuth, {Account, Profile, User} from 'next-auth'
import {randomBytes} from 'crypto'
import {JWT} from 'next-auth/jwt'

export interface TwitchProfile extends Record<string, any> {
  sub: string
  preferred_username: string
  email: string
  picture: string
}

const authRedirectUri = 'http://localhost:3000/api/auth/callback/twitch'
const oauthConfig: OAuthConfig<any> = {
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

const handler = NextAuth({
  debug: true,
  providers: [oauthConfig],
  callbacks: {
    async jwt(params: JWTCallbackParams) {
      if (params.account?.access_token) {
        params.token.accessToken = params.account.access_token
      }
      return params.token
    },
  },
})

export {handler as GET, handler as POST}
