import React from "react";
import { HiPlus, HiOutlineHashtag, HiOutlineLockClosed } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import ListItem from "./ListItem";
import { TiPlus } from "react-icons/ti";

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

      <div className={`channels-list ${expanded ? "expanded" : ""}`}>
        <ListItem prefix={<HiOutlineHashtag />} content="general" />
        <ListItem prefix={<HiOutlineLockClosed />} content="private" />
        <ListItem prefix={<HiOutlineHashtag />} selected content="random" />
        <ListItem prefix={<HiOutlineHashtag />} content="slack-clone" />
        <ListItem
          className="with-border"
          prefix={
            <div className="list-item-icon">
              <TiPlus size={14} />
            </div>
          }
          content="Add channels"
        />
      </div>
    </div>
  );
};

export default Channels;
