import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { HiPlus } from "react-icons/hi";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
// import Invitation from "../components/utils/Invitation";
import MessageSender from "../components/MessageSender";
import ProfileSetup from "../components/ProfileSetup";
import ContactItem from "../components/utils/ContactItem";
import { userData } from "../features/user/userSlice";
import DirectMessageProfile from "../components/utils/DirectMessageProfile";
import HeaderProfile from "../components/HeaderProfile";
import ChannelProfile from "../components/ChannelProfile";

const MainLayout = ({ Component, ...rest }) => {
  const craneUSer = useSelector(userData);

  const [profileEditor, setProfileEditor] = useState(false);
  const [channelList, setChannelList] = useState({});
  const [openChannel, setOpenChannel] = useState(false);
  const ownerOfApp = craneUSer.find(({ isLogin }) => isLogin === true);
  const [directMessageUser, setDirectMessageUser] = useState(
    ownerOfApp?.username
  );
  const showProfileEditor = () => {
    setProfileEditor(true);
  };
  const HideProfileEditor = () => {
    setProfileEditor(false);
  };

  const messageSenderPage = (nameOf) => {
    if (nameOf === ownerOfApp?.username) {
      return (
        <MessageSender
          key={ownerOfApp._id}
          active={ownerOfApp.active}
          username={ownerOfApp.username}
          src={ownerOfApp.src}
          receiverId={ownerOfApp._id}
          messageProfile={
            <DirectMessageProfile
              active={ownerOfApp.active}
              username={ownerOfApp.username}
              src={ownerOfApp.src}
              bio="This space is just for you. Jot down notes, list your to-dos, or
            keep links and files handy. You can also talk to yourself here,
            but please bear in mind you’ll have to supply both sides of the
            conversation."
              hiUserSize={60}
            />
          }
          // messageProfile={<ChannelProfile />}
          headerProfile={
            <HeaderProfile
              directMessage={true}
              active={ownerOfApp.active}
              src={ownerOfApp.src}
              username={ownerOfApp.username}
            />
          }
          // src: "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"

          friends={craneUSer}
          showProfileEditor={showProfileEditor}
          ownerUserName={ownerOfApp.username}
          ownerUserId={ownerOfApp._id}
        />
      );
    }

    return craneUSer?.map(({ active, src, username, _id }) => {
      if (nameOf === username) {
        return (
          <MessageSender
            key={_id}
            className="with-border"
            active={active}
            username={username}
            receiverId={_id}
            // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
            src={src}
            messageProfile={
              <DirectMessageProfile
                active={active}
                username={username}
                src={src}
                bio={`${username} hasn’t signed in yet…but you can leave a message for when they do.`}
                hiUserSize={60}
              />
            }
            headerProfile={
              <HeaderProfile
                directMessage={true}
                active={active}
                src={src}
                username={username}
              />
            }
            friends={craneUSer}
            showProfileEditor={showProfileEditor}
            ownerUserName={ownerOfApp.username}
            ownerUserId={ownerOfApp?._id}
          />
        );
      }

      return false;
    });
  };

  const channelPage = (channelId) => {
    return Object.values(channelList)?.map(
      ({ name, description, _id, isPublic }) => {
        if (channelId === _id) {
          return (
            <MessageSender
              key={_id}
              className="with-border"
              active={ownerOfApp.active}
              username={ownerOfApp.username}
              receiverId={ownerOfApp._id}
              // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
              src={ownerOfApp.src}
              messageProfile={
                <ChannelProfile name={name} isPublic={isPublic} />
              }
              headerProfile={
                <HeaderProfile
                  directMessage={false}
                  username={name}
                  isPublic={isPublic}
                />
              }
              friends={craneUSer}
              showProfileEditor={showProfileEditor}
              ownerUserName={ownerOfApp.username}
              ownerUserId={ownerOfApp?._id}
            />
          );
        }
        return false;
      }
    );
  };

  return (
    <div className="main-layout">
      <Sidebar
        friends={craneUSer}
        setDirectMessageUser={setDirectMessageUser}
        ownerOfApp={ownerOfApp}
        channelList={channelList}
        setChannelList={setChannelList}
        setOpenChannel={setOpenChannel}
      />

      <div className="layout-container">
        {!openChannel
          ? messageSenderPage(directMessageUser)
          : channelPage(directMessageUser)}
        {Component ? <Component /> : null}
      </div>

      <ProfileSetup
        edit="Edit"
        active={ownerOfApp?.active}
        username={ownerOfApp?.username}
        // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
        src={ownerOfApp?.src}
        workSpaceOwner={
          <div className="workspace-owner d-flex align-items-center fw-bold fs-6-7">
            Workspace Owner
          </div>
        }
        addName={
          <div className="add-name d-flex align-items-center fw-normal cursor-pointer">
            <HiPlus className="pr-2" />
            Add name pronunciation
          </div>
        }
        setStatus="Set a Status"
        email={
          <ContactItem
            itemIcon={<MdOutlineMail size={22} />}
            itemName="Email Address"
            itemValue={ownerOfApp?.email}
          />
        }
        phone={
          <ContactItem
            itemIcon={<BsTelephone size={18} />}
            itemName="phone"
            itemValue={
              <div className="add-name d-flex align-items-center fw-normal">
                <HiPlus className="pr-1" />
                Add Phone
              </div>
            }
          />
        }
        profileEditor={profileEditor}
        hideProfileEditor={HideProfileEditor}
      />
    </div>
  );
};

export default MainLayout;
