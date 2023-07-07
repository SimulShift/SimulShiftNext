enum api {
  twitch,
  gpt,
}

enum TwitchUserEndPoints {
  joined,
  join,
  leave,
  personality,
  registerCommand,
}

enum GptEndPoints {
  personality,
}

enum TmiEndPoints {
  start,
  status,
  stop,
}

class UrlBuilder {
  private static expressBaseUrl: string = process.env.EXPRESS_BACKEND_URL || 'http://localhost:8080'
  private static nextBaseUrl: string =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'

  private url: URL
  private endpointSet: boolean = false

  constructor(express: boolean) {
    if (express) {
      this.url = new URL(UrlBuilder.expressBaseUrl)
    } else {
      this.url = new URL(UrlBuilder.nextBaseUrl)
    }
  }

  public userId(userId: string): UrlBuilder {
    this.url.searchParams.append('userId', userId)
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

  public twitch(endpoint: TwitchUserEndPoints, channel: string): UrlBuilder {
    this.url.pathname += `/twitch/${channel}/${endpoint.toString()}`
    this.endpointSet = true
    return this
  }

  public gpt(endpoint: GptEndPoints): UrlBuilder {
    this.url.pathname += `/gpt/${endpoint.toString()}`
    this.endpointSet = true
    return this
  }

  public build(): string {
    console.log('built url:', this.url.toString())
    if (!this.endpointSet) {
      throw new Error('No endpoint set, please choose twitch, tmi, or gpt')
    }
    return this.url.toString()
  }
}
