import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const { isLoggedIn, isRegistered } = useAuth();

  if (isRegistered && !isLoggedIn) {
    return <Navigate to={"/verify-email"} />;
  }

  // If the user is not logged in, allow access to the page
  return !isRegistered && !isLoggedIn ? (
    component
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RestrictedRoute;
