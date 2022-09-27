import Profile from "./Profile";

const DirectMessageProfile = ({ bio, active, src, username, hiUserSize }) => {
  return (
    <div className="direct-message-profile">
      <Profile
        src={src}
        hiUserSize={hiUserSize}
        username={username}
        active={active}
      />
      <span className="d-flex mt-3 text-break">{bio}</span>
    </div>
  );
};

export default DirectMessageProfile;
