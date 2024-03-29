import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchPanel from "./SearchPanel";
import Profile from "../Components/Profile";
import { useSelector } from "react-redux";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
import { Contacts } from "./Contacts";

const Sidebar = () => {
  const { isMobileDevice } = useSelector(selectCurrentWindowSize);
  const [showProfile, setShowProfile] = useState(false);
  const showUserProfile = (boolean) => {
    setShowProfile(boolean);
  };
  const size = isMobileDevice ? "small" : "big";
  return (
    <>
      <aside className={`sidebar ${size}`}>
        {!showProfile && <Navbar showUserProfile={showUserProfile} />}
        {!showProfile && <SearchPanel />}
        {showProfile && <Profile showUserProfile={showUserProfile} />}
        {!showProfile && <Contacts />}
      </aside>
    </>
  );
};

export default Sidebar;
