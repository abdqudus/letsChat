import React, { Suspense, lazy, useContext, useState } from "react";
import Navbar from "./Navbar";
import SearchPanel from "./SearchPanel";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import Profile from "../Components/Profile";

const Sidebar = ({ toggleChatOn }) => {
  // const Profile = lazy(() => import("../Components/Profile"));
  const [showProfile, setShowProfile] = useState(false);
  const { width } = useContext(mobileDeviceChatContext);
  const showUserProfile = (boolean) => {
    setShowProfile(boolean);
  };
  const size = width <= 600 ? "small" : "big";
  return (
    <>
      <aside className={`sidebar ${size}`}>
        {!showProfile && <Navbar showUserProfile={showUserProfile} />}
        {!showProfile && <SearchPanel toggleChatOn={toggleChatOn} />}
        {showProfile && <Profile showUserProfile={showUserProfile} />}
      </aside>
    </>
  );
};

export default Sidebar;
