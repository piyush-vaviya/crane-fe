import React from "react";
import { HiPlus, HiOutlineHashtag, HiOutlineLockClosed } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import ListItem from "./ListItem";

const Channels = (props) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <div className={`channels-container ${expanded ? "border-none-imp" : ""}`}>
      <div
        className="channels-header h-100 d-flex justify-content-between align-items-center cursor-pointer px-1"
        onClick={handleExpand}
      >
        <div className="d-flex">
          <div className="icon-button">
            <IoPlay
              className={`rotate-icon ${expanded ? "rotate" : ""}`}
              size={10}
            />
          </div>
          <span className="m-auto">Channels</span>
        </div>
        <div className="d-flex">
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
      {expanded ? (
        <div className="channels-list">
          <ListItem prefix={<HiOutlineHashtag />} content="general" />
          <ListItem prefix={<HiOutlineLockClosed />} content="general" />
          <ListItem
            prefix={<HiOutlineLockClosed />}
            selected
            content="general"
          />
          <ListItem
            className="with-border"
            prefix={<HiOutlineHashtag />}
            content="piyush.vaviya 27"
            postfix="you"
            removable
          />
        </div>
      ) : null}
    </div>
  );
};

export default Channels;
