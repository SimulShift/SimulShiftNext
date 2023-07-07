enum api {
  twitch,
}
class UrlBuilder {
  private url: URL = new URL(process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000')

  constructor() {}

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

  public twitch(): UrlBuilder {
    this.url.pathname += '/twitch'
    return this
  }

  public build(): string {
    return this.url.toString()
  }
}
