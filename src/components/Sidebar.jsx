import React from "react";
import { HiChevronDown, HiPencilAlt } from "react-icons/hi";
import Channels from "./Channels";
import CraneTooltip from "./CraneTooltip";

const Sidebar = (props) => {
  return (
    <div className="sidebar noSelect">
      {/* Workspace Title */}
      <div className="workspace-title-container d-flex justify-content-between align-items-center px-3">
        <div className="flex-center">
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
    </div>
  );
};

export default Sidebar;
