import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { storage } from "../index";
import { auth } from "../index";
import { firestoredb } from "../index";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Loader from "../Components/Loader";
import { setDoc, doc } from "firebase/firestore";
import setDatabase from "../utils/setDatabase";
export default function SignUp() {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (img) {
        const imgRef = ref(
          storage,
          `images/${userCredential.user.uid}/${displayName}`
        );
        await uploadBytes(imgRef, img);
        const url = await getDownloadURL(imgRef);
        await updateProfile(userCredential.user, {
          displayName,
          photoURL: url,
        });
        await setDoc(doc(firestoredb, "users", userCredential.user.uid), {
          about: "Hey there, i'm using chatApp",
          uid: userCredential.user.uid,
          displayName,
          email,
          photoURL: url,
        });
      } else {
        await updateProfile(userCredential.user, {
          displayName,
          photoURL: "",
        });
        await setDoc(doc(firestoredb, "users", userCredential.user.uid), {
          about: "Hey there, i'm using chatApp",
          uid: userCredential.user.uid,
          displayName,
          email,
          photoURL: "",
        });
      }

      await setDoc(doc(firestoredb, "userChats", userCredential.user.uid), {});
      setDatabase(userCredential.user.uid, displayName);
      if (!userCredential.user.emailVerified) {
        sendEmailVerification(userCredential.user);
      }
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
          {err.includes("email-already-in-use") && (
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
