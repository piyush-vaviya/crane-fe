import {
  HiLockClosed,
  HiOutlineHashtag,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import UserProfileImage from "./utils/UserProfileImage";
import UserStatus from "./utils/UserStatus";

const HeaderProfile = ({ src, active, username, directMessage, isPublic }) => {
  console.log(directMessage);
  return (
    <>
      {directMessage ? (
        <div className="position-relative">
          <UserProfileImage src={src} hiUserSize={26} />
          <UserStatus active={active} position="position-absolute" />
        </div>
      ) : (
        <div className="d-flex align-items-center ">
          {isPublic ? (
            <HiOutlineHashtag size={20} />
          ) : (
            <HiLockClosed size={20} />
          )}
        </div>
      )}

      <div
        className={`userName text-break ${
          !directMessage ? "channel-type" : ""
        }`}
      >
        {username}
      </div>
      <RiArrowDownSLine />
    </>
  );
};
export default HeaderProfile;
