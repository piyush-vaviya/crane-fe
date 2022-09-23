import { CgClose } from "react-icons/cg";

const ProfileSetup = ({ active, username, src }) => {
  return (
    <div className="profile-setup">
      <div className="profile-header d-flex justify-content-between align-items-center px-3">
        <h3 className="m-0">Profile</h3>
        <CgClose />
      </div>
      <div className="profile-workSpace">
        <div className=" flex-center flex-column profile-information m-auto position-relative ">
          <img
            src="https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg"
            alt=""
          />
          <div className="workspace-owner fw-bold fs-6-7"> WorkSpace Owner</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
