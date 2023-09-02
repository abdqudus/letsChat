import React from "react";
import Sidebar from "../Components/Sidebar";
import ChatInterface from "../Components/ChatInterface";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { selectCurrentUser } from "../store/user/user.selector.js";
import { useSelector } from "react-redux";
import Login from "./Login";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isMobileDevice, showMobileMessages } = useSelector(
    selectCurrentWindowSize
  );
  const sendVerification = () => {
    sendEmailVerification(currentUser);
  };
  if (currentUser === null) {
    return <Login />;
  }

  if (
    currentUser.email !== "undefined" &&
    currentUser.emailVerified === false
  ) {
    return (
      <div>
        <h4>Hey there!, there's just one more step to go.</h4>
        <p>
          A verification link has been sent to your email. Kindly verify your
          email address by clicking on the link
        </p>
        <p>
          If you dont find it in your inbox, try checking your spam messages
        </p>
        <p>Didn't receive email? </p>
        <Link to=".">
          <p onClick={sendVerification}> click to resend verification email</p>
        </Link>
      </div>
    );
  }
  if (currentUser.emailVerified) {
    if (isMobileDevice) {
      return (
        <div className="homepage-wrapper">
          <div>{showMobileMessages ? <ChatInterface /> : <Sidebar />}</div>
        </div>
      );
    }
    return (
      <div className="homepage-wrapper">
        <div>
          <Sidebar />
          <ChatInterface />
        </div>
      </div>
    );
  }
};

export default Home;
