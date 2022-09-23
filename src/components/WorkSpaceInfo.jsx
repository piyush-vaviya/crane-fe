import { HiOutlineClock } from "react-icons/hi";
import DirectMessageProfile from "./DirectMessageProfile";
import getFullTime from "./localTime";

const WorkSpaceInfo = ({
  workspaceOwner,
  setStatus,
  username,
  active,
  src,
}) => {
  return (
    <div className="workspace-info position-absolute d-flex flex-column cursor-">
      {workspaceOwner ? (
        <div className="workspace-owner fs-7">{workspaceOwner}</div>
      ) : null}

      <div className="owner-profile">
        <DirectMessageProfile username={username} active={active} src={src} />
      </div>
      <div className="local-time d-flex flex-column p-3 ">
        <div className="d-flex align-items-center fs-6-7 fw-normal">
          <HiOutlineClock className="pr-1" /> {getFullTime("hh:mm tt")} Local
          time
        </div>
        {setStatus ? (
          <div className="status-update-setting align-self-center mt-3 cursor-pointer fs-7 d-flex justify-content-center">
            {" "}
            {setStatus}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WorkSpaceInfo;
