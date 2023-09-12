import React from "react";
import { Link } from "react-router-dom";
import { sendVerification } from "..";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";

const Verification = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="verification-prompt-div">
      <h4>Hey there!, there's just one more step to go.</h4>
      <p>
        A verification link has been sent to your email. Kindly verify your
        email address by clicking on the link
      </p>
      <p>If you dont find it in your inbox, try checking your spam messages</p>
      <p>Didn't receive email? </p>
      <Link to=".">
        <p onClick={() => sendVerification(currentUser)}>
          click to resend verification email
        </p>
      </Link>
    </div>
  );
};

export default Verification;
