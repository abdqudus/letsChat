import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import { windowResize } from "./store/window-size/window.action";
import store from "../src/store/store";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const BadConnection = lazy(() => import("./pages/BadConnection"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
export default function App() {
  console.log(store);
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
        <Suspense>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}
