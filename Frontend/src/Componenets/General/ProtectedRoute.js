import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("logged");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "true" ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;
