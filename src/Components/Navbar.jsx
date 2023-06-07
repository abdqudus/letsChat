import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Status from "../img/status.png";
import WhiteStatus from "../img/status-white.png";
import MoreWhite from "../img/more-white.png";
import defaultDP from "../img/user.png";
import More from "../img/more.png";
const Navbar = ({ showUserProfile }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div>
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
      <img src={More} className="big-navbar-icon" alt="more options icon" />
      <img
        className="small-navbar-icon"
        src={MoreWhite}
        alt="more options icon"
      />
    </nav>
  );
};

export default Navbar;
