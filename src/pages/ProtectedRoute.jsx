import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
