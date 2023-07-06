import Image from 'next/image'
import me from '/public/me.jpg'

const backendFetchTest = async () => {
  console.log('backend fetch test')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`)
    return await res.json()
  } catch (e) {
    console.log('backend fetch test error', e)
    return {error: e}
  }
}
const About = async () => {
  const data = await backendFetchTest()
  console.log('data in about page', data)

  return (
    <section>
      <h2>About SimulShift</h2>
      <p>{JSON.stringify(data)}</p>
      <p>
        SimulShift is a Twitch streamer focused on software development, with a particular emphasis
        on videogame development. Join the stream to learn and follow along as SimulShift creates
        exciting games, shares coding tips and tricks, and discusses the latest trends in the game
        development industry.
      </p>
      <div>
        <Image
          className="rounded-full"
          src={me}
          alt="SimulShift Logo"
          placeholder="blur"
          blurDataURL="/me.jpg"
          width="0"
          height="0"
          sizes="100vw"
          style={{width: 500, height: 'auto'}}
        />
      </div>
    </section>
  )
}

export default About
