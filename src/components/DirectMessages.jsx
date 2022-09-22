import React from "react";
import { HiPlus } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
import ListItem from "./ListItem";
import ProfileStatus from "./ProfileStatus";

const DirectMessages = (props) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <div className={`dms-container ${expanded ? "border-none-imp" : ""}`}>
      <div
        className="dms-header h-100 d-flex justify-content-between align-items-center cursor-pointer px-1"
        onClick={handleExpand}
      >
        <div className="d-flex">
          <div className="icon-button">
            <IoPlay
              className={`rotate-icon ${expanded ? "rotate" : ""}`}
              size={10}
            />
          </div>
          <span className="m-auto">Direct Messages</span>
        </div>
        <div className="d-flex show-icon-button">
          <div className="icon-button" onClick={(e) => e.stopPropagation()}>
            <FiMoreVertical />
          </div>
          <div
            className="icon-button ml-1"
            onClick={(e) => e.stopPropagation()}
          >
            <HiPlus />
          </div>
        </div>
      </div>

      <div className={`dms-list ${expanded ? "expanded" : ""}`}>
        <ListItem
          className="with-border"
          selected
          prefix={
            <ProfileStatus
              active
              src={
                "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
              }
            />
          }
          content="rashmika.piyush143"
          postfix="you"
          removable
        />
        <ListItem
          prefix={
            <ProfileStatus
              active
              src={
                "https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg"
              }
            />
          }
          content="kiara.yagnesh7446"
          removable
        />
        <ListItem
          prefix={
            <ProfileStatus
              active={false}
              src={
                "https://c.ndtvimg.com/2022-09/gg6q0kcg_disha_625x300_10_September_22.jpg"
              }
            />
          }
          content="disha.patni56"
          removable
        />
        <ListItem
          selected
          prefix={
            <ProfileStatus
              active={false}

              // src={
              //   "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg"
              // }
            />
          }
          content="jacqueline.fernandez45"
          removable
        />
        <ListItem
          className="with-border"
          prefix={
            <div className="list-item-icon">
              <TiPlus size={14} />
            </div>
          }
          content="Add teammates"
        />
      </div>
    </div>
  );
};

export default DirectMessages;
