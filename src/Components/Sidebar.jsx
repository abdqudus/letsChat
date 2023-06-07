import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import SearchPanel from "./SearchPanel";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import Profile from "../Components/Profile";

const Sidebar = ({ toggleChatOn }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { showMobileChat } = useContext(mobileDeviceChatContext);
  const showUserProfile = (boolean) => {
    setShowProfile(boolean);
  };
  return (
    <>
      <aside className="sidebar big">
        {!showProfile && <Navbar showUserProfile={showUserProfile} />}
        {!showProfile && <SearchPanel toggleChatOn={toggleChatOn} />}
        {showProfile && <Profile showUserProfile={showUserProfile} />}
      </aside>
      {!showMobileChat && (
        <aside className="sidebar small">
          {!showProfile && <Navbar showUserProfile={showUserProfile} />}
          {!showProfile && <SearchPanel toggleChatOn={toggleChatOn} />}
          {showProfile && <Profile showUserProfile={showUserProfile} />}
        </aside>
      )}
    </>
  );
};

export default Sidebar;
