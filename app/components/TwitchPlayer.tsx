const TwitchPlayer = () => (
  <iframe
    src={`https://player.twitch.tv/?channel=simulshift&parent=${process.env.NEXT_PUBLIC_PARENT_DOMAIN}&muted=true`}
    height="400"
    width="800"
    allowFullScreen
  ></iframe>
)

export default TwitchPlayer
