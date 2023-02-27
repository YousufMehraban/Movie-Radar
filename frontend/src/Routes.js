import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
      <Switch>
        <PrivateRoute exact path="/recommendation">
          <Recommendation />
        </PrivateRoute>

        <PrivateRoute exact path="/watchlist">
          <WatchList />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LogInForm logIn={logIn} />
        </Route>

        <Route exact path="/register">
          <SignUpForm signUp={signUp} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
