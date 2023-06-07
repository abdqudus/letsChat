import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
