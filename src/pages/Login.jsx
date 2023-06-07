import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../index";
import hide from "../img/hide.png";
import show from "../img/view.png";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    const { email, password } = user;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="login-wrapper">
      <div className="form-div">
        <h2>letsChat </h2>
        <p>Log in</p>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
            onFocus={() => setErr("")}
          />
          {err.includes("user-not-found") && (
            <p className="login-error">Incorrect email!</p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              value={user.password}
              onFocus={() => setErr("")}
            />
            <img
              className="show-hide-password"
              src={showPassword ? show : hide}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          {err.includes("wrong-password") && (
            <p className="login-error">Incorrect password!</p>
          )}
          <button>{isSigningIn ? "Signing in" : "Sign in"}</button>
        </form>
        <Link to="/forgot-password">
          <p className="password-forget">Forgotten Password?</p>
        </Link>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
