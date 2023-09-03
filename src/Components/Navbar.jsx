import React, { useContext, useState } from "react";
import Status from "../img/status.png";
import WhiteStatus from "../img/status-white.png";
import MoreWhite from "../img/more-white.png";
import defaultDP from "../img/user.png";
import More from "../img/more.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
import { signOutStart } from "../store/user/user.action";

const Navbar = ({ showUserProfile }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { isMobileDevice } = useSelector(selectCurrentWindowSize);
  const [showSignOut, setShowSignOut] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOutStart());
    navigate("login");
  };
  console.log(currentUser);
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
          isMobileDevice ? "small-signout" : ""
        }`}
      >
        <p>Sign Out</p>
      </div>
    </nav>
  );
};

export default Navbar;
