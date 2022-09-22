import React from "react";
import ListItem from "./ListItem";
import { RiArrowDownSLine } from "react-icons/ri";
import ProfileStatus from "./ProfileStatus";
import { TiPlus } from "react-icons/ti";
import CraneTooltip from "./CraneTooltip";

const Header = (props) => {
  return (
    <div className="header w-100 d-flex flex-column position-relative">
      <div className="profile-details d-flex position-relative align-items-center">
        <ListItem
          prefix={
            <ProfileStatus
              active={false}
              src={
                "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
              }
            />
          }
          content="rashmika.piyush143"
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
