import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignUpForm from "./forms/SignUpForm";
import LogInForm from "./forms/LogInForm";
import Profile from "./forms/Profile";
import Homepage from "./Homepage";
import WatchList from "./watchlist/WatchList";
import PrivateRoute from "./PrivateRoutes";
import Recommendation from "./recommendation/Recommendation";
import HomepageCard from "./HomepageCard";
import MovieDetail from "./MovieDetail";

const Routes = ({ logIn, signUp }) => {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/recommendation/:user_id">
          <Recommendation />
        </PrivateRoute>

        <PrivateRoute exact path="/watchlist/:user_id">
          <WatchList />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <PrivateRoute exact path="/movie">
          <HomepageCard />
        </PrivateRoute>

        <Route exact path="/movie/:movie_id">
          <MovieDetail />
        </Route>
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
