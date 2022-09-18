import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = ({ Component, ...rest }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-container">
        <Header />
        {Component ? <Component /> : null}
      </div>
    </div>
  );
};

export default MainLayout;
