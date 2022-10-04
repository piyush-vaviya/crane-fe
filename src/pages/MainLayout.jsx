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

const MainLayout = ({ Component, ...rest }) => {
  const craneUSer = useSelector(userData);

  const [profileEditor, setProfileEditor] = useState(false);
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

  console.log(ownerOfApp);
  // const friends = [
  //   {
  //     active: true,
  //     src: "https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg",
  //     username: "kiara.yagnesh7446",
  //   },
  //   {
  //     active: false,
  //     // src: "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
  //     username: "jacqueline.fernandez45",
  //   },
  //   {
  //     active: true,
  //     //  src :"https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
  //     src: "https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg",
  //     username: "mia.malkova69",
  //     // selected: true,
  //   },
  // ];

  const messageSenderPage = (name) => {
    if (name === ownerOfApp?.username) {
      return (
        <MessageSender
          active={ownerOfApp?.active}
          username={ownerOfApp?.username}
          src={ownerOfApp?.src}
          // src: "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
          bio="This space is just for you. Jot down notes, list your to-dos, or
          keep links and files handy. You can also talk to yourself here,
          but please bear in mind you’ll have to supply both sides of the
          conversation."
          friends={craneUSer}
          showProfileEditor={showProfileEditor}
          ownerUserName={ownerOfApp?.username}
        />
      );
    }

    return craneUSer?.map(({ active, src, username }, index) => {
      if (name === username) {
        return (
          <MessageSender
            key={index}
            className="with-border"
            active={active}
            username={username}
            // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
            src={src}
            bio="This space is just for you. Jot down notes, list your to-dos, or
          keep links and files handy. You can also talk to yourself here,
          but please bear in mind you’ll have to supply both sides of the
          conversation."
            friends={craneUSer}
            showProfileEditor={showProfileEditor}
            ownerUserName={ownerOfApp.username}
          />
        );
      }
      return false;
    });
  };

  //   if (name === "jacqueline.fernandez45") {
  //     return (
  //       <MessageSender
  //         active={false}
  //         username="jacqueline.fernandez45"
  //         // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
  //         src="https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
  //         bio="This space is just for you. Jot down notes, list your to-dos, or
  //       keep links and files handy. You can also talk to yourself here,
  //       but please bear in mind you’ll have to supply both sides of the
  //       conversation."
  //         friends={friends}
  //         showProfileEditor={showProfileEditor}
  //       />
  //     );
  //   }
  //   if (name === "kiara.yagnesh7446") {
  //     return (
  //       <MessageSender
  //         active={false}
  //         username="kiara.yagnesh7446"
  //         // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
  //         src="https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg"
  //         bio="This space is just for you. Jot down notes, list your to-dos, or
  //       keep links and files handy. You can also talk to yourself here,
  //       but please bear in mind you’ll have to supply both sides of the
  //       conversation."
  //         friends={friends}
  //         showProfileEditor={showProfileEditor}
  //       />
  //     );
  //   }
  //   if (name === "mia.malkova69") {
  //     return (
  //       <MessageSender
  //         active={false}
  //         username="mia.malkova69"
  //         src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
  //         // src="https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
  //         bio="This space is just for you. Jot down notes, list your to-dos, or
  //       keep links and files handy. You can also talk to yourself here,
  //       but please bear in mind you’ll have to supply both sides of the
  //       conversation."
  //         friends={friends}
  //         showProfileEditor={showProfileEditor}
  //       />
  //     );
  //   } else console.log("hii");
  // };

  return (
    <div className="main-layout">
      <Sidebar
        friends={craneUSer}
        setDirectMessageUser={setDirectMessageUser}
      />

      <div className="layout-container">
        {messageSenderPage(directMessageUser)}
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
