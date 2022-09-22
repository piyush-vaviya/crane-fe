import ListItem from "./ListItem";
import ProfileStatus from "./ProfileStatus";

const DirectMessageProfile = ({ bio, active, src, username }) => {
  return (
    <div className="direct-message-profile  ">
      <ListItem
        prefix={<ProfileStatus active={active} src={src} />}
        postfix="(you)"
        content={username}
      />

      <span className="d-flex mt-3 text-break">{bio}</span>
    </div>
  );
};

export default DirectMessageProfile;
