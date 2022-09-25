import UserProfileImage from "./UserProfileImage";
import UserStatus from "./UserStatus";

const DirectMessageProfile = ({
  bio,
  active,
  src,
  username,
  postfix,
  hiUserSize,
}) => {
  return (
    <div className="direct-message-profile  ">
      <div className="direct-message-profile-info d-flex align-items-center fw-bold">
        <UserProfileImage src={src} hiUserSize={hiUserSize} />
        <div className="userName text-break">{username}</div>
        {username === "rashmika.piyush143" ? (
          <div className="user-postfix">(You)</div>
        ) : null}
        <UserStatus active={active} />
      </div>
      <span className="d-flex mt-3 text-break">{bio}</span>
    </div>
  );
};

export default DirectMessageProfile;
