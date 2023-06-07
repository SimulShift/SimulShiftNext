import NextAuth from 'next-auth'
import TwitchProvider from 'next-auth/providers/twitch'

//console.log('process.env.TWITCH_CLIENT_ID:', process.env.TWITCH_CLIENT_ID)
//console.log(
//  'process.env.TWITCH_CLIENT_SECRET:',
//  process.env.TWITCH_CLIENT_SECRET,
//)
const handler = NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
    }),
  ],
})

export {handler as GET, handler as POST}
