import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { storage } from "../index";
import { auth } from "../index";
import { firestoredb } from "../index";
import { INITIAL_STATE } from "../store/user/user.reducer";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Loader from "../Components/Loader";
import { setDoc, doc } from "firebase/firestore";
import setDatabase from "../utils/setDatabase";
import { useDispatch } from "react-redux";
import { reInitializeUser, signUpStart } from "../store/user/user.action";
import { waitForAuthResponse } from "../utils/awaitAuthResponse";
export default function SignUp() {
  const dispatch = useDispatch();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    url: "",
  });

  const [img, setImg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    const { email, password, displayName } = user;
    try {
      dispatch(reInitializeUser(INITIAL_STATE));
      dispatch(signUpStart(email, password, displayName, img));
      const a = await waitForAuthResponse();
      console.log(a);
      setIsSigningUp(false);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsSigningUp(false);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  };
  const handleSelectImg = (e) => {
    setImg(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      setUser((prev) => ({ ...prev, url: e.target.result }));
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="register-wrapper">
      <div className="form-div">
        <h2>letsChat</h2>
        <p>Sign up</p>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="displayName"
            placeholder="display name"
            onChange={handleChange}
            value={user.displayName}
          />
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
          {err.includes("auth/weak-password") && (
            <p style={{ color: "red" }}>
              Password should be at least 6 characters
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleSelectImg}
          />
          {!img && (
            <label htmlFor="file">
              <img className="add-avatar" src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
          )}
          {img && (
            <img
              style={{
                marginInline: "auto",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              src={user.url}
            />
          )}
          {err.includes("auth/email-already-in-use") && (
            <p style={{ color: "red" }}>
              {`This email has already been used, Do you wish to ${" "}`}
              <Link to="/login"> Sign in?</Link>{" "}
            </p>
          )}
          <button>{isSigningUp ? "Signing up " : "Sign up"}</button>
          {isSigningUp && <Loader />}
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
