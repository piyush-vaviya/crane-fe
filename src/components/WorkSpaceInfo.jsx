import { useEffect } from "react";
import { HiOutlineClock } from "react-icons/hi";
import DirectMessageProfile from "./DirectMessageProfile";

var date, TimeType, hour, minutes, seconds, fullTime;

date = new Date();

hour = date.getHours();

if (hour <= 11) {
  TimeType = "AM";
} else {
  TimeType = "PM";
}

if (hour > 12) {
  hour = hour - 12;
}

if (hour === 0) {
  hour = 12;
}

minutes = date.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes.toString();
}

seconds = date.getSeconds();

if (seconds < 10) {
  seconds = "0" + seconds.toString();
}

fullTime =
  hour.toString() +
  ":" +
  minutes.toString() +
  ":" +
  seconds.toString() +
  " " +
  TimeType.toString();

const WorkSpaceInfo = ({
  workspaceOwner,
  setStatus,
  username,
  active,
  src,
}) => {
  useEffect(() => {}, []);
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
          <HiOutlineClock className="pr-1" /> {fullTime} Local time
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
