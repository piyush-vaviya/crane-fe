import React from "react";
import { HiUser } from "react-icons/hi";

const ProfileStatus = ({ src, active, addButton, plusSign }) => {
  return !addButton ? (
    <div className="profile-status position-relative flex-center">
      <div className="position-relative">
        {src ? (
          <img
            className="user-dp flex-center object-fit-cover"
            alt=""
            src={src}
          ></img>
        ) : (
          <div className="user-dp flex-center" alt="">
            <HiUser size={60} />
          </div>
        )}

        <div
          className={`user-status ${
            active ? "active" : "not-active"
          } flex-center position-absolute
      `}
        >
          {!active ? <div className="user-offline-status"></div> : null}
        </div>
      </div>
    </div>
  ) : (
    <div className="profile-status position-relative flex-center">
      <div className="user-dp flex-center">{plusSign}</div>
    </div>
  );
};

export default ProfileStatus;
