import React, { useContext } from "react";
import Sidebar from "../Components/Sidebar";
import ChatInterface from "../Components/ChatInterface";
import { AuthContext } from "../Contexts/AuthContext";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { showMobileChat } = useContext(mobileDeviceChatContext);
  const sendVerification = () => {
    sendEmailVerification(currentUser);
  };
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
    return (
      <div className="homepage-wrapper">
        <div>
          {!showMobileChat && <Sidebar />}
          <ChatInterface />
        </div>
      </div>
    );
  }
};

export default Home;
