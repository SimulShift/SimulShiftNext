import styles from './styles.module.css'

const AboutLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default AboutLayout
