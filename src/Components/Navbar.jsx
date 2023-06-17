import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Status from "../img/status.png";
import WhiteStatus from "../img/status-white.png";
import MoreWhite from "../img/more-white.png";
import defaultDP from "../img/user.png";
import More from "../img/more.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
const Navbar = ({ showUserProfile }) => {
  const navigate = useNavigate();
  const { width } = useContext(mobileDeviceChatContext);
  const { currentUser } = useContext(AuthContext);
  const [showSignOut, setShowSignOut] = useState(false);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("login");
  };

  return (
    <nav className="navbar">
      <div style={{ position: "relative" }}>
        <img
          className="dp"
          onClick={() => {
            showUserProfile(true);
          }}
          src={currentUser.photoURL ? currentUser.photoURL : defaultDP}
          alt="display picture"
        />
      </div>

      <img src={Status} className=" big-navbar-icon" alt="status icon" />
      <img src={WhiteStatus} className="small-navbar-icon" alt="status icon" />
      <img
        src={More}
        className="big-navbar-icon"
        alt="more options icon"
        onClick={() => setShowSignOut((prev) => !prev)}
      />
      <img
        onClick={() => setShowSignOut((prev) => !prev)}
        className="small-navbar-icon"
        src={MoreWhite}
        alt="more options icon"
      />
      <div
        onClick={handleSignOut}
        className={`logout-div ${showSignOut ? "" : "hidden"} ${
          width <= 600 ? "small-signout" : ""
        }`}
      >
        <p>Sign Out</p>
      </div>
    </nav>
  );
};

export default Navbar;
