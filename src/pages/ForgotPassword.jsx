import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleRretrievePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setShowMessage(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
  return (
    <div className="find-account-div">
      {!showMessage && (
        <div className="find-account-wrapper">
          <h2>Find Your Account</h2>
          <hr />
          <p>Please enter your email address to search for your account.</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="enter your email"
          />
          <hr />
          <div>
            <Link to="/login">
              <button>Cancel</button>
            </Link>
            <button
              onClick={handleRretrievePassword}
              className="find-account-btn"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
      {showMessage && (
        <div>
          <p style={{ color: "white", marginBlock: "1em" }}>
            A link has been sent to your email.
          </p>
          <p style={{ color: "white", marginBlock: "1em" }}>
            Click on the link to reset your password
          </p>
          <p>
            <Link to="/login">Back to login page</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
