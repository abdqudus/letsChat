import Login from "./pages/Login";
import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute";
import BadConnection from "./pages/BadConnection";
import React, { Suspense, lazy } from "react";
import ForgotPassword from "./pages/ForgotPassword";
export default function App() {
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
