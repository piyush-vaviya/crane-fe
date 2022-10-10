import React from "react";
import ProfileSetup from '../components/ProfileSetup'
import Sidebar from "../components/Sidebar";
import { MdOutlineMail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import ContactItem from '../components/utils/ContactItem'
import Header from "../components/Header";
// import Invitation from "../components/utils/Invitation";
import MessageSender from '../components/MessageSender'

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

export default MainLayout;
