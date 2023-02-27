import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import userContext from "./helpers/userContext";

const PrivateRoute = ({ exact, path, children }) => {
  const { currentUser } = useContext(userContext);

  if (!currentUser) {
    return <Route path="*" element={<Navigate to="/" replace />} />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
