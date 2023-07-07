import {ExtendedSession} from '../api/auth/[...nextauth]/route'

class Snatcher {
  url: string
  userId: string

  constructor(url: string, session: ExtendedSession) {
    this.url = url
    if (!session.sub) {
      throw new Error('No userId in session')
    }
    this.userId = session.sub
  }

  async get<T>() {
    try {
      const fullUrl = new URL(`http://localhost:3000/api/handlers`)
      fullUrl.searchParams.append('url', this.url)
      fullUrl.searchParams.append('userId', this.userId)
      console.log('fullUrl:', fullUrl.toString())
      const res = await fetch(fullUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return (await res.json()) as T
    } catch (error) {
      console.log(`Error for url: ${this.url} and userId: ${this.userId}`, error)
      return {error, url: this.url, userId: this.userId}
    }
  }
}

export default Snatcher
