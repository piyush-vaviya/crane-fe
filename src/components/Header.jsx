import React from "react";
import ListItem from "./ListItem";
import { RiArrowDownSLine } from "react-icons/ri";
import ProfileStatus from "./utils/ProfileStatus";
import { TiPlus } from "react-icons/ti";
import CraneTooltip from "./utils/CraneTooltip";
import UserProfileImage from "./utils/UserProfileImage";
import UserStatus from "./utils/UserStatus";

const Header = ({ active, src, username }) => {
  return (
    <div className="header w-100 d-flex flex-column ">
      <div className="profile-details d-flex  align-items-center">
        <div className="header-profile d-flex  align-items-center">
          <div className="position-relative">
            <UserProfileImage src={src} hiUserSize={26} />
            <UserStatus active={active} position="position-absolute" />
          </div>
          <div className="userName text-break">{username}</div>
          <RiArrowDownSLine />
        </div>
      </div>
      <div className="add-bookmark d-flex align-items-center">
        <CraneTooltip
          title={
            <div>
              <span className="fs-7 fw-bold">Add a bookmark</span>
            </div>
          }
          content={
            <div className="title-edit">
              <ListItem
                prefix={
                  <ProfileStatus
                    active
                    addButton={true}
                    plusSign={<TiPlus size={12} />}
                  />
                }
                content="Add a bookmark"
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Header;
