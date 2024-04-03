import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  if (process.env.REACT_APP_ENABLE_APP_SCAN == "disabled") {
    /* Ensures that only authenticated users can access private routes. */
    const idToken = useSelector((state) => state.Auth.idToken);
    return idToken ? <Outlet /> : <Navigate to="/" />;
  } else {
    //SSO Login is disabled, redirect to home page
    return <Outlet />;
  }
};
export default PrivateRoute;
