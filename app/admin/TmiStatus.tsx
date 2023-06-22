type TmiStatusProps = {
  status: string
}

const TmiStatus = ({status}: TmiStatusProps) => {
  return (
    <div>
      <h1>TmiStatus: {status}</h1>
    </div>
  )
}

export default TmiStatus
