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

class TwitchBot {
  static twitchBot: TwitchBot
  static chadGptTmiClient: tmi.Client
  static chadClientId = process.env.TWITCH_CLIENT_ID
  static chadClientSecret = process.env.TWITCH_CLIENT_SECRET
  static chadGptCredentials: {code: string; token: string} | undefined
  static channels: string[] = ['SimulShift']
  static userAuthDict: {[username: string]: {code: string; token: string}} = {}

  constructor(authCode: string, redirectUri: string) {
    // TODO: check if already validated then skip this
    TwitchBot.initChadTmiClient(authCode, redirectUri)
      .then(() => {
        TwitchBot.chadGptTmiClient.connect().catch(console.error)
      })
      .catch(console.error)
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
              client_id: this.chadClientId,
              client_secret: this.chadClientSecret,
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

  static async initChadTmiClient(authCode: string, redirectUri: string) {
    const accessToken = await TwitchBot.getAuthToken(authCode, redirectUri)
    TwitchBot.chadGptCredentials = {code: authCode, token: accessToken}

    //this.chadGp
    const opts: tmi.Options = {
      identity: {
        username: 'TheRealChadGPT',
        password: accessToken,
      },
      channels: this.channels,
    }
    this.chadGptTmiClient = new tmi.client(opts)
    // Register our event handlers (defined below)
    this.chadGptTmiClient.on(
      'message',
      this.twitchBot.onMessageHandler.bind(this),
    )
    this.chadGptTmiClient.on(
      'connected',
      this.twitchBot.onConnectedHandler.bind(this),
    )
  }

  static async getUserInfo(clientId: string, accessToken: string) {
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
        TwitchBot.chadGptTmiClient
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
              TwitchBot.chadGptTmiClient
                .say(channel, response)
                .catch(console.error)
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
        TwitchBot.chadGptTmiClient.part(channel).catch(console.error)
        break
      case '!ask': {
        const ChadGTP = new ChadGpt()
        const sanitizedInput = TwitchBot.sanitizeInput(
          commandArguments.join(' '),
        )
        ChadGTP.askChatGpt(sanitizedInput, ChadGpt.askMessages)
          .then(response => {
            if (response) {
              TwitchBot.chadGptTmiClient
                .say(channel, response)
                .catch(console.error)
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
    for (const channel of TwitchBot.channels) {
      try {
        await TwitchBot.chadGptTmiClient.say(channel, `/displayname Chad`)
      } catch (error: unknown) {
        console.error('Error setting display name:', error)
      }
      await TwitchBot.chadGptTmiClient.say(channel, `Hello, I am a new bot!`)
    }
  }
}

export default TwitchBot
