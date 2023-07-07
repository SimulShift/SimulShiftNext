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

enum TmiEndPoints {
  start,
  status,
  stop,
}

enum GptEndPoints {
  personalities,
}

class UrlBuilder {
  private url: URL = new URL(process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000')
  private endpointSet: boolean = false

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
    return this
  }

  public twitch(endpoint: TwitchUserEndPoints): UrlBuilder {
    this.url.pathname += '/twitch/' + endpoint.toString()
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
