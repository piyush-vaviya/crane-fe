import React from "react";
import { HiChevronDown, HiPencilAlt } from "react-icons/hi";
import Channels from "./Channels";
import CraneTooltip from "./CraneTooltip";
import DirectMessages from "./DirectMessages";

const Sidebar = (props) => {
  return (
    <div className="sidebar noSelect position-relative">
      {/* Workspace Title */}
      <div className="workspace-title-container d-flex justify-content-between align-items-center px-3">
        <div className="flex-center">
          <img
            // src="https://theviraler.com/wp-content/uploads/2021/04/Mia-Malkova-big-boobs-pics.jpg"
            src="https://s1.lovefap.com/content/photos/0cd452e1d0efb17f29c61854898c6cf8.jpeg"
            alt=""
            className="position-absolute"
            style={{
              width: "584px",
              height: "784px",
              zIndex: "1",
              left: "80vh",
              objectFit: "cover",
              bottom: "0",
            }}
          />
          <span className="title">Mass Developers</span>
          <HiChevronDown size={20} />
        </div>
        <CraneTooltip
          title={
            <div className="flex-center flex-column">
              <span className="fs-7 fw-bold">New message</span>
              <div className="d-flex mt-2">
                <div className="tooltip-chip">Ctrl</div>
                <div className="tooltip-chip ml-2">N</div>
              </div>
            </div>
          }
          content={
            <div className="title-edit flex-center">
              <HiPencilAlt size={20} />
            </div>
          }
        />
      </div>
      {/* Channels List */}
      <Channels />
      {/* Direct Messages List */}
      <DirectMessages />
    </div>
  );
};

export default Sidebar;
