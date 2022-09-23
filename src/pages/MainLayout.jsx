import React from "react";
import Sidebar from "../components/Sidebar";
import MessageSender from "../components/MessageSender";
import ProfileSetup from "../components/ProfileSetup";

const MainLayout = ({ Component, ...rest }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-container">
        <MessageSender
          active={true}
          username="rashmika.piyush143"
          src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
          bio="This space is just for you. Jot down notes, list your to-dos, or
        keep links and files handy. You can also talk to yourself here,
        but please bear in mind you’ll have to supply both sides of the
        conversation."
        />
        {Component ? <Component /> : null}
      </div>
      <ProfileSetup
        active={true}
        username="rashmika.piyush143"
        src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
      />
    </div>
  );
};

export default MainLayout;
