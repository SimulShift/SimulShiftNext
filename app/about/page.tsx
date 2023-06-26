import Image from 'next/image'

const About = () => {
  return (
    <section>
      <h2>About SimulShift</h2>
      <p>
        SimulShift is a Twitch streamer focused on software development, with a
        particular emphasis on videogame development. Join the stream to learn
        and follow along as SimulShift creates exciting games, shares coding
        tips and tricks, and discusses the latest trends in the game development
        industry.
      </p>
      <div>
        <Image
          className="rounded-full"
          src="/me.jpg"
          alt="SimulShift Logo"
          placeholder="blur"
          blurDataURL="/me.jpg"
          width={200}
          height={200}
        />
      </div>
    </section>
  )
}

export default About
