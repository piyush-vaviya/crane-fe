import * as React from "react";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiUser } from "react-icons/hi";
import { RiArrowDownSLine, RiDeleteBin6Fill } from "react-icons/ri";
import { Button, CircularProgress } from "@mui/material";
import { TiEdit } from "react-icons/ti";
import { GrPowerReset } from "react-icons/gr";
import CraneTooltip from "./utils/CraneTooltip";
import WorkSpaceInfo from "./WorkSpaceInfo";
import CircularProgressBar from "./utils/CircularProgressBar";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import axios from "../components/api/message";
import { userData } from "../features/user/userSlice";

const Sender = ({
  src,
  username,
  active,
  chatMessage,
  setChatMessage,
  showProfileEditor,
  editorState,
  setEditorState,
  editingMode,
  setEditingMode,
  content,
  setEditorId,
  setEditorLocalKey,
  senderId,
  receiverId,
}) => {
  const [loading, setLoading] = useState(false);

  const craneUSer = useSelector(userData);
  const ownerOfApp = craneUSer.find(({ _id }) => _id === senderId);

  const setTime = (time, type = "hh:mm:ss, tt") => {
    const messageTime = new Date(time);
    let hour, minutes;
    hour = messageTime.getHours();

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour === 0) {
      hour = 12;
    }
    minutes = messageTime.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }

    return hour + ":" + minutes;
  };

  const editMessage = async (_id, i, localKey) => {
    const messageWannaEdit = chatMessage[i].message;
    const blocksFromHtml = messageWannaEdit;
    const html = blocksFromHtml;
    const blocksFromHTML = convertFromHTML(html);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditingMode(true);
    setEditorId(_id);
    setEditorLocalKey(localKey);
    setEditorState(EditorState.createWithContent(content));
    setChatMessage(chatMessage);
  };

  const resendMessage = async (_id) => {
    let clonedMessages = { ...chatMessage };
    let localKey = 7;

    clonedMessages[localKey].sending = true;
    clonedMessages[localKey].sendingError = false;
    setLoading(true);

    try {
      let oldMessage = clonedMessages[localKey].message;
      const response = await axios.post("/message", { message: oldMessage });

      clonedMessages[localKey]._id = response._id;
      clonedMessages[localKey].sending = false;
      clonedMessages[localKey].sendingError = false;

      toast.success(response.success);
    } catch (error) {
      clonedMessages[localKey].sending = false;
      clonedMessages[localKey].sendingError = true;
      toast.error(error.message);
    }
    setLoading(false);
    setChatMessage(clonedMessages);
  };

  const deleteMessage = async (_id, localKey) => {
    setLoading(true);
    let craneMessages = { ...chatMessage };

    // let newObject = _.remove(craneMessages, function (nv) {
    //   return nv._id === _id;
    // });

    craneMessages[localKey].isDeleting = true;
    if (craneMessages[localKey]?.sendingError) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10500)
      );
      craneMessages[localKey].isDeleting = false;
      delete craneMessages[localKey];
      // setChatMessage(chatMessage);
    } else {
      try {
        await axios.delete(`/message?id=${_id}`);
        craneMessages[localKey].isDeleting = false;

        delete craneMessages[localKey];
        setChatMessage(craneMessages);
        toast.success("message deleted");
      } catch (err) {
        craneMessages[localKey].isDeleting = false;
        toast.error(err.message);
      }
    }
    setChatMessage(craneMessages);
    setLoading(false);
  };

  const SenderMessage = ({ chatMessage }) => {
    const allMessages = useMemo(() => {
      return Object.values(chatMessage).map((msg, i) =>
        //  if (msg.senderId === receiverId && msg.receiverId === receiverId) {
        //       return (
        //         <div className="msg-container d-flex position-relative" key={i}>
        //           <CraneTooltip
        //             placement="top"
        //             arrow={false}
        //             title={
        //               <WorkSpaceInfo
        //                 username={username}
        //                 active={active}
        //                 src={src}
        //                 workspaceOwner="Workspace Owner"
        //                 setStatus="Set a Status"
        //               />
        //             }
        //             content={
        //               <div className="sender-profile-image cursor-pointer" alt="">
        //                 {src ? <img src={src} alt="" /> : <HiUser size={40} />}
        //               </div>
        //             }
        //           />

        //           <div className="sender d-flex flex-column position-relative">
        //             <div className="d-flex sender-name-time align-items-end ">
        //               <CraneTooltip
        //                 placement="top"
        //                 arrow={false}
        //                 title={
        //                   <WorkSpaceInfo
        //                     username={username}
        //                     active={active}
        //                     src={src}
        //                     workspaceOwner="Workspace Owner"
        //                     setStatus="Set a Status"
        //                   />
        //                 }
        //                 content={
        //                   <div
        //                     className="sender-name fw-bold cursor-pointer"
        //                     onClick={showProfileEditor}
        //                   >
        //                     {username}
        //                   </div>
        //                 }
        //               />
        //               <CraneTooltip
        //                 title={
        //                   <div className="flex-center flex-column">
        //                     <span className="fs-7 fw-bold">
        //                       Today at{" "}
        //                       {new Date(msg.messageTime).toLocaleTimeString()}
        //                     </span>
        //                   </div>
        //                 }
        //                 content={
        //                   <div className="sender-message-time fs-7 ml-2 cursor-pointer">
        //                     {new Date(msg.messageTime).toLocaleString("en-US", {
        //                       hour: "numeric",
        //                       minute: "numeric",
        //                       hour12: true,
        //                     })}
        //                   </div>
        //                 }
        //               />
        //             </div>
        //             <div className="sender-first-message text-break">
        //               <div className="d-flex align-items-center">
        //                 <span
        //                   className="message-format"
        //                   dangerouslySetInnerHTML={{
        //                     __html: `${msg.message}`,
        //                   }}
        //                 />
        //                 {Date.now()}
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       );
        //     }    else {
        i === 0 ? (
          <div className="msg-container d-flex position-relative" key={msg._id}>
            <CraneTooltip
              placement="top"
              arrow={false}
              title={
                <WorkSpaceInfo
                  username={ownerOfApp.username}
                  active={ownerOfApp.active}
                  src={ownerOfApp.src}
                  workspaceOwner="Workspace Owner"
                  setStatus="Set a Status"
                />
              }
              content={
                <div className="sender-profile-image cursor-pointer" alt="">
                  {ownerOfApp.src ? (
                    <img src={ownerOfApp.src} alt="" />
                  ) : (
                    <HiUser size={40} />
                  )}
                </div>
              }
            />

            <div className="sender d-flex flex-column position-relative">
              <div className="d-flex sender-name-time align-items-end ">
                <CraneTooltip
                  placement="top"
                  arrow={false}
                  title={
                    <WorkSpaceInfo
                      username={ownerOfApp.username}
                      active={ownerOfApp.active}
                      src={ownerOfApp.src}
                      workspaceOwner="Workspace Owner"
                      setStatus="Set a Status"
                    />
                  }
                  content={
                    <div
                      className="sender-name fw-bold cursor-pointer"
                      onClick={showProfileEditor}
                    >
                      {ownerOfApp.username}
                    </div>
                  }
                />

                {/* <Drawer anchor="right" open={state} onClose={toggleDrawer}>
                                  <div>hii this is piyush</div>
                                </Drawer> */}
                <CraneTooltip
                  title={
                    <div className="flex-center flex-column">
                      <span className="fs-7 fw-bold">
                        Today at{" "}
                        {new Date(msg.messageTime).toLocaleTimeString()}
                      </span>
                    </div>
                  }
                  content={
                    <div className="sender-message-time fs-7 ml-2 cursor-pointer">
                      {new Date(msg.messageTime).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </div>
                  }
                />
              </div>
              <div className="sender-first-message text-break">
                <div className="d-flex align-items-center">
                  <span
                    className="message-format"
                    dangerouslySetInnerHTML={{
                      __html: `${msg.message}`,
                    }}
                  />
                  {Date.now()}
                  {msg?.sending ? (
                    <CircularProgressBar
                      content="Message Sending"
                      circularProgress={
                        <CircularProgress
                          size={15}
                          className="ml-2 cursor-pointer"
                          style={{ color: "white" }}
                        />
                      }
                    />
                  ) : null}
                  {msg?.isUpdating ? (
                    <CircularProgressBar
                      content="Message updating"
                      circularProgress={
                        <CircularProgress
                          size={15}
                          className="ml-2 cursor-pointer"
                          style={{ color: "green" }}
                        />
                      }
                    />
                  ) : null}
                  {msg?.sendingError ? (
                    <CircularProgressBar
                      content="retry"
                      circularProgress={
                        <GrPowerReset
                          className="ml-2 grow-power-reset"
                          size={15}
                          onClick={() => resendMessage(msg._id)}
                        />
                      }
                    />
                  ) : null}
                  {msg?.isDeleting ? (
                    <CircularProgressBar
                      content=" message deleting"
                      circularProgress={
                        <CircularProgress
                          size={15}
                          className="ml-2 cursor-pointer"
                          style={{ color: "red" }}
                        />
                      }
                    />
                  ) : null}
                </div>
              </div>
            </div>
            {!msg?.sending ? (
              <div className="d-flex edit-delete-icon position-absolute">
                <CraneTooltip
                  title={<span className="fs-7 fw-bold">Edit</span>}
                  content={
                    <Button
                      className={`edit-message cursor-pointer flex-center`}
                      onClick={() => editMessage(msg._id, i, msg.localKey)}
                    >
                      <TiEdit size={20} />
                    </Button>
                  }
                />
                <CraneTooltip
                  title={<span className="fs-7 fw-bold">Delete</span>}
                  content={
                    <Button
                      className={`delete-message cursor-pointer flex-center `}
                      onClick={() => deleteMessage(msg._id, msg.localKey)}
                    >
                      <RiDeleteBin6Fill size={20} />
                    </Button>
                  }
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div
            className="sender-message d-flex align-items-center position-relative"
            key={msg._id}
          >
            <CraneTooltip
              title={
                <div className="flex-center flex-column">
                  <span className="fs-7 fw-bold">
                    Today at {new Date(msg.messageTime).toLocaleTimeString()}
                  </span>
                </div>
              }
              content={
                <div className="sender-message-time cursor-pointer ">
                  {setTime(msg.messageTime)}
                </div>
              }
            />
            <div className="message text-break d-flex justify-content-between w-100">
              {" "}
              <div className="d-flex align-items-center">
                <span
                  className="message-format"
                  dangerouslySetInnerHTML={{
                    __html: `${msg.message}`,
                  }}
                />
                {Date.now()}
                {msg.sending ? (
                  <CircularProgressBar
                    content="Message Sending"
                    circularProgress={
                      <CircularProgress
                        size={15}
                        className="ml-2 cursor-pointer"
                        style={{ color: "white" }}
                      />
                    }
                  />
                ) : null}
                {msg?.isUpdating ? (
                  <CircularProgressBar
                    content="Message updating"
                    circularProgress={
                      <CircularProgress
                        size={15}
                        className="ml-2 cursor-pointer"
                        style={{ color: "green" }}
                      />
                    }
                  />
                ) : null}
                {msg?.sendingError ? (
                  <CircularProgressBar
                    content="retry"
                    circularProgress={
                      <GrPowerReset
                        className="ml-2 grow-power-reset"
                        size={15}
                        onClick={() => resendMessage(msg._id)}
                      />
                    }
                  />
                ) : null}
                {msg?.isDeleting ? (
                  <CircularProgressBar
                    content=" message deleting"
                    circularProgress={
                      <CircularProgress
                        size={15}
                        className="ml-2 cursor-pointer"
                        style={{ color: "red" }}
                      />
                    }
                  />
                ) : null}
              </div>
              {!msg?.sending && !msg.isDeleting && !msg.isUpdating ? (
                <div className="d-flex edit-delete-icon position-absolute">
                  <CraneTooltip
                    title={
                      <span className="fs-7 fw-bold show-edit-delete">
                        Edit
                      </span>
                    }
                    content={
                      <Button
                        className={`edit-message cursor-pointer flex-center`}
                        onClick={() => editMessage(msg._id, i, msg.localKey)}
                      >
                        <TiEdit size={20} />
                      </Button>
                    }
                  />
                  <CraneTooltip
                    title={
                      <span className="fs-7 fw-bold show-edit-delete">
                        Delete
                      </span>
                    }
                    content={
                      <Button
                        className={`delete-message cursor-pointer flex-center `}
                        onClick={() => deleteMessage(msg._id, msg.localKey)}
                      >
                        <RiDeleteBin6Fill size={20} />
                      </Button>
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        )
      );
    }, [chatMessage]);

    return (
      <div className="sender-message-container d-flex flex-column">
        <div className="sender-message-header flex-center position-relative mb-3">
          <div className="message-duration flex-center cursor-pointer">
            <div className="fw-bold">Today</div>
            <RiArrowDownSLine size={12} className="pl-1" />
          </div>
        </div>

        {allMessages}
      </div>
    );
  };

  return Object.keys(chatMessage)?.length ? (
    <SenderMessage chatMessage={chatMessage} />
  ) : null;
};

export default Sender;
