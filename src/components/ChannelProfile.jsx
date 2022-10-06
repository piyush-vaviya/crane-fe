import * as React from "react";
import { useState } from "react";
import {
  HiLockClosed,
  HiOutlineHashtag,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { RiUserAddLine } from "react-icons/ri";
import ModalBlock from "./utils/ModalBlock";
import { Button, TextField } from "@mui/material";
import { IoLockClosedOutline } from "react-icons/io5";

const ChannelProfile = ({ name, isPublic }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="channel-profile-container d-flex ">
      <div className="channel-logo border flex-center fw-bold">
        {isPublic ? (
          <HiOutlineHashtag size={22} />
        ) : (
          <IoLockClosedOutline size={22} />
        )}
      </div>
      <div className="channel-description d-flex flex-column">
        <div className="channel-info d-flex align-items-center fw-bold ">
          This is the very beginning of the{" "}
          <div className="d-flex align-items-center channel-type-name px-1">
            {isPublic ? (
              <HiOutlineHashtag className="mr-1" />
            ) : (
              <HiLockClosed className="mr-1" />
            )}{" "}
            {name}
          </div>{" "}
          channel
        </div>
        <span className="message-format text-break">
          This channel is for everything #slack-clone. Hold meetings, share
          docs, and make decisions together with your team.
        </span>
        <Button
          className="d-flex align-items-center add-people "
          onClick={handleOpen}
        >
          <RiUserAddLine className="mr-2" size={22} /> Add people
        </Button>
        <ModalBlock
          open={open}
          handleClose={handleClose}
          modalHeader={
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bold">add people</span>
              <span># general</span>
            </div>
          }
          modalData={
            <div className="mt-4 d-flex flex-column add-people-container">
              <TextField
                id="outlined-basic-description"
                className="mt-3"
                name="description"
                placeholder="Enter a name or Email"
                //   value={channelDescription}
                //   onChange={(e) => setChannelDescription(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ fontSize: "20px !important" }}
                // onChange={}
              />
              <Button className="add-people-save-btn">save</Button>
            </div>
          }
        />
      </div>
    </div>
  );
};
export default ChannelProfile;
