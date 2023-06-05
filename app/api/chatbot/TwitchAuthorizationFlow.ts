import TwitchBot from './TwitchBot.js'
import https from 'https'
import fs from 'fs'
import * as path from 'path'
import {fileURLToPath} from 'url'

const port = process.env.PORT || '3000' // Assuming '3000' is the default port
const app = express()

const setupStaticFiles = () => {
  const currentFileUrl = fileURLToPath(import.meta.url)
  const currentDirPath = path.dirname(currentFileUrl)
  const staticPath = path.join(currentDirPath, '..', 'static')
  console.log('staticPath:', staticPath)
  app.use(express.static(staticPath, {dotfiles: 'allow'}))
}
setupStaticFiles()

// simple get route for testing
app.get('/', (_, res: Response) => {
  console.log("I'm here!")
  res.send('Hello World!')
})

// Step 1: Redirect the user to the Twitch authorization URL
const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://simulshift.com/auth/callback'
    : `http://localhost:${port}/auth/callback`

app.get('/auth', (_, res: Response) => {
  // set base url based on NODE_ENV
  console.log('redirectUri:', redirectUri)

  const clientId = process.env.TWITCH_CLIENT_ID || ''
  const scopes: string[] = ['chat:read', 'chat:edit']
  const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(
    ' ',
  )}`
  res.redirect(authUrl)
})

// Step 2: Handle the authorization callback
app.get('/auth/callback', (req: Request, res: Response) => {
  handleAuthorizationCallback(req).catch(console.error)
  res.send('Authorization successful! You can close this window.')
})

const handleAuthorizationCallback = async (req: Request) => {
  const code: string | string[] | undefined = req.query.code as string
  const twitchBot = new TwitchBot()
  await twitchBot.initialize(code, redirectUri).catch(console.error)
  await twitchBot.startBot().catch(console.error)
}

export const startServer = () => {
  if (process.env.NODE_ENV === 'production') {
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/simulshift.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/simulshift.com/cert.pem'),
    }

    https.createServer(options, app).listen(443, () => {
      console.log('Server listening on port 443')
    })
  } else {
    // Dev environment
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port: ${process.env.PORT?.toString()}`,
      )
    })
  }
}

export default startServer
