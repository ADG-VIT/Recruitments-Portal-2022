import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token");
  console.log("this", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
