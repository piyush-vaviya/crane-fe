import React from "react";
import ListItem from "./ListItem";
import { RiArrowDownSLine } from "react-icons/ri";
import ProfileStatus from "./ProfileStatus";
import { TiPlus } from "react-icons/ti";
import CraneTooltip from "./CraneTooltip";

const Header = ({ active, src, username }) => {
  return (
    <div className="header w-100 d-flex flex-column ">
      <div className="profile-details d-flex  align-items-center">
        <ListItem
          prefix={<ProfileStatus active={active} src={src} />}
          content={username}
          arrow={<RiArrowDownSLine />}
        />
      </div>
      <div className="add-bookmark d-flex">
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
