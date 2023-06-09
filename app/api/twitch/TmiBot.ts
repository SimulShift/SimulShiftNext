import tmi from 'tmi.js'
import ChadGpt from '../chatbot/ChadGPT'

type ChannelDictionary = Record<string, string>

class TmiBot {
  static twitchBot: TmiBot
  chadGptTmiClient: tmi.Client
  chadClientId = process.env.TWITCH_CLIENT_ID
  chadClientSecret = process.env.TWITCH_CLIENT_SECRET
  chadGptCredentials: {code: string; token: string} | undefined
  channels: ChannelDictionary = {}
  userAuthDict: {[username: string]: {code: string; token: string}} = {}

  private constructor(accessToken: string) {
    /* Start tmi.js client */
    const password = 'oauth:' + accessToken
    const opts: tmi.Options = {
      options: {debug: true},
      identity: {
        username: 'TheRealChadGPT',
        password: password,
      },
      channels: Object.values(this.channels),
    }
    this.chadGptTmiClient = new tmi.client(opts)
    // Register our event handlers (defined below)
    this.chadGptTmiClient.on('message', this.onMessageHandler.bind(this))
    this.chadGptTmiClient.on('connected', this.onConnectedHandler.bind(this))

    // Connect to Twitch:
    this.chadGptTmiClient.connect()
  }

  public static startBot(accessToken?: string): TmiBot {
    if (!TmiBot.twitchBot) {
      if (!accessToken) throw new Error('Missing ChadId or accessToken!')
      TmiBot.twitchBot = new TmiBot(accessToken)
    }
    return TmiBot.twitchBot
  }

  public static getInstance(): TmiBot {
    if (!TmiBot.twitchBot) {
      throw new Error('TwitchBot not initialized!')
    }
    return TmiBot.twitchBot
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
        const sanitizedInput = TmiBot.sanitizeInput(commandArguments.join(' '))
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
        const sanitizedInput = TmiBot.sanitizeInput(commandArguments.join(' '))
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

  // Called every time the bot connects to Twitch chat
  async onConnectedHandler(addr: string, port: number) {
    console.log(`* Connected to ${addr}:${port}`)
    // Step 1: Set the bot's display name

    for (const channel of Object.values(this.channels)) {
      await this.chadGptTmiClient.say(channel, `Hello, I am a new bot!`)
    }
  }
}

export default TmiBot
