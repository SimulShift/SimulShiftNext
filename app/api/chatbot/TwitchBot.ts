import tmi from 'tmi.js'
import axios, {AxiosError, AxiosResponse} from 'axios'
import ChadGpt from './ChadGPT'

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

const clientId = process.env.TWITCH_CLIENT_ID
const clientSecret = process.env.TWITCH_CLIENT_SECRET

class TwitchBot {
  chadGptTmiClient!: tmi.Client
  channels: string[] = ['SimulShift']
  chadGptAuth: {code: string; token: string} | undefined
  userAuthDict: {[username: string]: {code: string; token: string}} = {}

  constructor(authCode: string, redirectUri: string) {
    this.InitChadTmiClient(authCode, redirectUri)
  }

  static async getAuthToken(
    authCode: string,
    redirectUri: string,
  ): Promise<string> {
    try {
      const response: AxiosResponse<TokenResponse> | void =
        await axios.post<TokenResponse>(
          'https://id.twitch.tv/oauth2/token',
          null,
          {
            params: {
              client_id: clientId,
              client_secret: clientSecret,
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

  async InitChadTmiClient(authCode: string, redirectUri: string) {
    const accessToken = await TwitchBot.getAuthToken(authCode, redirectUri)
    const opts: tmi.Options = {
      identity: {
        username: 'TheRealChadGPT',
        password: accessToken,
      },
      channels: this.channels,
    }
    this.chadGptTmiClient = new tmi.client(opts)
    // Register our event handlers (defined below)
    this.chadGptTmiClient.on('message', this.onMessageHandler.bind(this))
    this.chadGptTmiClient.on('connected', this.onConnectedHandler.bind(this))
  }

  static async getUserInfo(accessToken: string) {
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

  async startBot() {
    await this.chadGptTmiClient.connect().catch(console.error)
  }

  // Function called when the "dice" command is issued
  rollDice(): number {
    const sides = 6
    return Math.floor(Math.random() * sides) + 1
  }

  // Called every time a message comes in
  onMessageHandler(
    channel: string,
    context: tmi.ChatUserstate,
    msg: string,
    self: boolean,
  ): void {
    if (self) {
      return
    } // Ignore messages from the bot

    const commandParts = msg.trim().split(' ')
    const commandName = commandParts[0].toLowerCase()
    const commandArguments = commandParts.slice(1)
    switch (commandName) {
      case '!dice':
        this.chadGptTmiClient
          .say(channel, `You rolled a ${this.rollDice()}`)
          .catch(console.error)
        console.log(`* Executed ${commandName} command`)
        break

      case '!chad': {
        const ChadGTP = new ChadGpt()
        const sanitizedInput = TwitchBot.sanitizeInput(
          commandArguments.join(' '),
        )
        console.log('!chad command received', sanitizedInput)

        ChadGTP.askChatGpt(sanitizedInput, ChadGpt.chadMessages)
          .then(response => {
            if (response) {
              this.chadGptTmiClient.say(channel, response).catch(console.error)
              console.log(`Response from Chad: ${response}`)
            }
          })
          .catch(error => {
            console.error('Error in !chad command:', error)
          })
        break
      }
      case '!exit':
        // leave channel message was sent from
        this.chadGptTmiClient.part(channel).catch(console.error)
        break
      case '!ask': {
        const ChadGTP = new ChadGpt()
        const sanitizedInput = TwitchBot.sanitizeInput(
          commandArguments.join(' '),
        )
        ChadGTP.askChatGpt(sanitizedInput, ChadGpt.askMessages)
          .then(response => {
            if (response) {
              this.chadGptTmiClient.say(channel, response).catch(console.error)
            }
          })
          .catch(console.error)
        break
      }
      default:
        console.log(`* Unknown command ${commandName}`)
        break
    }
  }

  static sanitizeInput(input: string): string {
    // Replace semicolons and pipes with empty strings
    const sanitizedInput = input.replace(/[;|]/g, '')
    return sanitizedInput
  }

  /*
  validateInput(input: string): boolean {
    // Define your validation criteria
    const validPattern = /^[a-zA-Z0-9\s]+$/

    // Check if the input matches the validation criteria
    return validPattern.test(input)
  }
  */

  // Called every time the bot connects to Twitch chat
  async onConnectedHandler(addr: string, port: number) {
    console.log(`* Connected to ${addr}:${port}`)
    // Step 1: Set the bot's display name

    // change display name for all channels
    for (const channel of this.channels) {
      try {
        await this.chadGptTmiClient.say(channel, `/displayname Chad`)
      } catch (error: unknown) {
        console.error('Error setting display name:', error)
      }
      await this.chadGptTmiClient.say(channel, `Hello, I am a new bot!`)
    }
  }
}

export default TwitchBot
