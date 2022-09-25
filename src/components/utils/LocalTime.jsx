import { HiOutlineClock } from "react-icons/hi";
import getFullTime from "../localTime";

const LocalTime = () => {
  return (
    <div className="d-flex align-items-center fs-6-7 fw-normal">
      <HiOutlineClock className="pr-1" /> {getFullTime("hh:mm tt")} Local time
    </div>
  );
};

export default LocalTime;
