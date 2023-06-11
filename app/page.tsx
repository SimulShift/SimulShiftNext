import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <main>
      <Link id={styles.TwitchLink} href="https://twitch.tv/SimulShift">
        Twitch.tv/SimulShift
      </Link>
    </main>
  )
}

export default Home
