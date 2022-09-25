import React from "react";
import { HiPlus } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
import ListItem from "./ListItem";
import ProfileStatus from "./utils/ProfileStatus";

const DirectMessages = ({ friends, setDirectMessageUserName }) => {
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
        {friends?.map(
          ({ active, src, username, selected, postfix, className }, index) => (
            <div onClick={() => setDirectMessageUserName(username)} key={index}>
              <ListItem
                className={className}
                prefix={<ProfileStatus active={active} src={src} />}
                content={username}
                removable
                // selected={selected}
                postfix={postfix}
              />
            </div>
          )
        )}
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
