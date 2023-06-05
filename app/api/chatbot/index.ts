import startServer from './TwitchAuthorizationFlow.js'

const main = () => {
  startServer()
  console.log('Server running in environment:', process.env.NODE_ENV)
}

main()
