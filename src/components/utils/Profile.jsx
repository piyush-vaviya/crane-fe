import UserProfileImage from "./UserProfileImage";
import UserStatus from "./UserStatus";

const Profile = ({ src, hiUserSize, username, active, position }) => {
  return (
    <div className="direct-message-profile-info d-flex align-items-center fw-bold">
      <UserProfileImage src={src} hiUserSize={hiUserSize} />
      <div className="userName text-break">{username}</div>
      {username === "rashmika.piyush143" ? (
        <div className="user-postfix">(You)</div>
      ) : null}
      <UserStatus active={active} position={position} />
    </div>
  );
};
export default Profile;
