export enum TwitchUserEndPoints {
  joined = 'joined',
  join = 'join',
  leave = 'leave',
  registerCommand = 'registerCommand',
}

export enum GptEndPoints {
  personality = 'personality',
}

export enum TmiEndPoints {
  start = 'start',
  status = 'status',
  stop = 'stop',
}

class UrlBuilder {
  private static expressBaseUrl: string = process.env.EXPRESS_BACKEND_URL || 'http://localhost:8080'
  private static nextBaseUrl: string =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'
  private express: boolean

  private url: URL
  private endpointSet: boolean = false

  constructor(express: boolean = false) {
    this.express = express
    express
      ? (this.url = new URL(UrlBuilder.expressBaseUrl))
      : (this.url = new URL(UrlBuilder.nextBaseUrl))
  }

  public userId(userId: string | null): UrlBuilder {
    if (!userId) throw new Error('Must provide userId')
    this.url.searchParams.append('userId', userId)
    return this
  }

  public channel(channel: string | null | undefined): UrlBuilder {
    if (!channel) throw new Error('Must provide channel')
    this.url.searchParams.append('channel', channel)
    return this
  }

  public admin(): UrlBuilder {
    if (this.url.pathname === '/') {
      this.url.pathname = '/admin'
    } else {
      throw new Error('Cannot set admin route when path is not root')
    }
    return this
  }

  public tmi(endpoint: TmiEndPoints): UrlBuilder {
    // error if not /admin
    if (this.url.pathname !== '/admin') {
      throw new Error('Cannot set tmi route when path is not /admin')
    }
    this.url.pathname += '/tmi/' + endpoint.toString()
    this.endpointSet = true
    return this
  }

  public twitch(endpoint: TwitchUserEndPoints): UrlBuilder {
    this.url.pathname += `/twitch/${endpoint.toString()}`
    this.endpointSet = true
    return this
  }

  public gpt(endpoint: GptEndPoints): UrlBuilder {
    this.url.pathname += `/gpt/${endpoint.toString()}`
    this.endpointSet = true
    return this
  }

  public build(): string {
    if (!this.endpointSet) {
      throw new Error('No endpoint set, please choose twitch, tmi, or gpt')
    }
    if (!this.express) {
      this.url.pathname = '/api' + this.url.pathname
    }
    // check if there are two / in a row
    if (this.url.pathname.slice(0, 2) === '//') {
      this.url.pathname = this.url.pathname.slice(1)
    }
    console.log('built url:', this.url.toString())
    return this.url.toString()
  }
}

export default UrlBuilder