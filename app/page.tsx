import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <main>
      Welcome to SimulShift.com! below is my twitch stream hosted on:
      <br />
      <Link id={styles.TwitchLink} href="https://twitch.tv/SimulShift">
        Twitch.tv/SimulShift
      </Link>
      <iframe
        src={`https://player.twitch.tv/?channel=simulshift&parent=${process.env.NEXT_PUBLIC_PARENT_DOMAIN}&muted=true`}
        height="400"
        width="800"
        allowFullScreen></iframe>
    </main>
  )
}

export default Home
