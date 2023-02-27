import React from "react";
import { Navigate, Route } from "react-router-dom";
import SignUpForm from "./forms/SignUpForm";
import LogInForm from "./forms/LogInForm";
import Profile from "./forms/Profile";
import Homepage from "./Homepage";
import WatchList from "./watchlist/WatchList";
import PrivateRoute from "./PrivateRoutes";
import Recommendation from "./recommendation/Recommendation";

const Routes = ({ logIn, signUp }) => {
  return (
    <div>
      <Routes>
        <PrivateRoute exact path="/recommendation">
          <Recommendation />
        </PrivateRoute>

        <PrivateRoute exact path="/watchlist">
          <WatchList />
        </PrivateRoute>

        <PrivateRoute exact path="/users/:username">
          <Profile />
        </PrivateRoute>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/users/login">
          <LogInForm logIn={logIn} />
        </Route>

        <Route exact path="/users/register">
          <SignUpForm signUp={signUp} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
};

export default Routes;
