import { HiUser } from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import CraneTooltip from "./CraneTooltip";
import WorkSpaceInfo from "./WorkSpaceInfo";

const Sender = ({ src, username, active, chatMessage }) => {
  const SenderMessage = () => {
    return (
      <div className="sender-message-container d-flex flex-column">
        <div className="sender-message-header flex-center position-relative mb-3">
          <div className="message-duration flex-center cursor-pointer">
            <div className="fw-bold">Today</div>
            <RiArrowDownSLine size={12} className="pl-1" />
          </div>
        </div>

        {chatMessage?.map((msg, i) =>
          i === 0 ? (
            <div className="msg-container d-flex" key={i}>
              <div className="sender-profile-image cursor-pointer" alt="">
                {src ? <img src={src} alt="" /> : <HiUser size={40} />}
              </div>
              <div className="sender d-flex flex-column position-relative">
                <div className="d-flex sender-name-time align-items-end ">
                  <div className="sender-name fw-bold cursor-pointer ">
                    <WorkSpaceInfo
                      username={username}
                      active={active}
                      src={src}
                      workspaceOwner="Workspace Owner"
                      setStatus="Set a Status"
                    />
                    {username}
                  </div>
                  <CraneTooltip
                    title={
                      <div className="flex-center flex-column">
                        <span className="fs-7 fw-bold">
                          Today at {msg.time}
                        </span>
                      </div>
                    }
                    content={
                      <div className="sender-message-time fs-7 ml-2 cursor-pointer">
                        {msg.time}
                      </div>
                    }
                  />
                </div>
                <div className="sender-first-message text-break">
                  <span
                    className="message-format"
                    dangerouslySetInnerHTML={{
                      __html: `${msg.message}`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="sender-message d-flex align-items-center" key={i}>
              <CraneTooltip
                title={
                  <div className="flex-center flex-column">
                    <span className="fs-7 fw-bold">Today at {msg.time}</span>
                  </div>
                }
                content={
                  <div className="sender-message-time cursor-pointer">
                    {msg.time}
                  </div>
                }
              />
              <div className="message text-break">
                {" "}
                <span
                  className="message-format"
                  dangerouslySetInnerHTML={{
                    __html: `${msg.message}`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return chatMessage?.length ? <SenderMessage /> : null;
};

export default Sender;
