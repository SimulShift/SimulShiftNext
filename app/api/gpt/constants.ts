export const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://simulshift.com/auth/callback'
    : 'http://localhost/api/auth/callback/twitch'
