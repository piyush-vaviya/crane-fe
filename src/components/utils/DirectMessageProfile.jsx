import Profile from './Profile'

const DirectMessageProfile = ({ bio, user, hiUserSize, ownerOfApp }) => {
  return (
    <div className="direct-message-profile">
      <Profile user={user} hiUserSize={hiUserSize} />
      <span className="d-flex mt-3 text-break bio">{bio}</span>
    </div>
  )
}

export default DirectMessageProfile
