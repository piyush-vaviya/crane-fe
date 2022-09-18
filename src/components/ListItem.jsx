import React from "react";
import { CgClose } from "react-icons/cg";

const ListItem = ({
  prefix,
  content,
  postfix,
  removable,
  className,
  selected,
  selectable = true,
}) => {
  return (
    <div
      className={`list-item-container d-flex justify-content-between align-items-center ${
        selectable && selected ? "selected" : ""
      } ${className || ""}`}
    >
      <div className="list-item-content flex-center">
        <div className="prefix flex-center">{prefix}</div>
        <div className="content flex-center">{content}</div>
        <div className="postfix">{postfix}</div>
      </div>
      {removable ? (
        <div className="list-item-remove icon-with-hover flex-center">
          <CgClose />
        </div>
      ) : null}
    </div>
  );
};

export default ListItem;
