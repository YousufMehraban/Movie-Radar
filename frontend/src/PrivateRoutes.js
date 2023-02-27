import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import userContext from "./helpers/userContext";

const PrivateRoute = ({ exact, path, children }) => {
  const { currentUser } = useContext(userContext);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
