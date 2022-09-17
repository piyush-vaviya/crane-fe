import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = (props) => {
  console.log("hii");
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default MainLayout;
