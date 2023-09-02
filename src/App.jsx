import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute";
import BadConnection from "./pages/BadConnection";
import React, { Suspense, lazy, useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import { windowResize } from "./store/window-size/window.action";
import { selectCurrentWindowSize } from "./store/window-size/window.selector";
export default function App() {
  const dispatch = useDispatch();
  dispatch(checkUserSession());
  const dispatchSize = () => {
    dispatch(windowResize());
  };
  useEffect(() => {
    window.addEventListener("resize", dispatchSize);
    return () => {
      window.removeEventListener("resize", dispatchSize);
    };
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="bad-network" element={<BadConnection />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
