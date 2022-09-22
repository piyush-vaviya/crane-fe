import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MessageSender from "../components/MessageSender";

const MainLayout = ({ Component, ...rest }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-container">
        <Header />
        <MessageSender />
        {Component ? <Component /> : null}
      </div>
    </div>
  );
};

export default MainLayout;
