import styles from './page.module.css'

const Home = () => {
  return (
    <main className={styles.main}>
      <iframe
        src="https://player.twitch.tv/?channel=simulshift&parent=localhost&muted=true"
        height="400"
        width="800"
        allowFullScreen></iframe>
    </main>
  )
}

export default Home
