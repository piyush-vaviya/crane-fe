import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { HiPlus } from "react-icons/hi";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
// import Invitation from "../components/utils/Invitation";
import MessageSender from "../components/MessageSender";
import ProfileSetup from "../components/ProfileSetup";
import ContactItem from "../components/utils/ContactItem";

const MainLayout = ({ Component, ...rest }) => {
  const [profileEditor, setProfileEditor] = useState(false);
  const [directMessageUserName, setDirectMessageUserName] =
    useState("rashmika.piyush143");
  const showProfileEditor = () => {
    setProfileEditor(true);
  };
  const HideProfileEditor = () => {
    setProfileEditor(false);
  };
  const friends = [
    {
      selected: true,
      active: true,
      username: "rashmika.piyush143",
      src: "https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg",
      postfix: "you",
      className: "with-border",
    },
    {
      active: true,
      src: "https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg",
      username: "kiara.yagnesh7446",
    },
    {
      active: false,
      // src: "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
      username: "jacqueline.fernandez45",
    },
    {
      active: false,
      //  src :"https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
      src: "https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg",
      username: "mia.malkova69",
      // selected: true,
    },
  ];

  const messageSenderPage = (name) => {
    return friends?.map(({ active, src, username }, index) => {
      if (name === username) {
        return (
          <MessageSender
            key={index}
            active={active}
            username={username}
            // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
            src={src}
            bio="This space is just for you. Jot down notes, list your to-dos, or
          keep links and files handy. You can also talk to yourself here,
          but please bear in mind you’ll have to supply both sides of the
          conversation."
            friends={friends}
            showProfileEditor={showProfileEditor}
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
        friends={friends}
        setDirectMessageUserName={setDirectMessageUserName}
      />
      <div className="layout-container">
        {messageSenderPage(directMessageUserName)}
        {Component ? <Component /> : null}
      </div>

      <ProfileSetup
        edit="Edit"
        active={false}
        username="rashmika.piyush143"
        // src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
        src="https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
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
            itemValue="piyush.vaviya27@gmail.com"
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
