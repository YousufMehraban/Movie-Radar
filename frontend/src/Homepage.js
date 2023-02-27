import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import userContext from "./helpers/userContext";

const HomePage = () => {
  const { currentUser } = useContext(userContext);

  return (
    <div className="movieRadarHome">
      {currentUser ? (
        <>
          <h1> Welcome to Movie Radar, {currentUser.username}! </h1>
          <p>We know whether it's on:</p>
          <img
            src="../public/logos/netflix.png"
            alt="netflix logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/hboMax.png"
            alt="/HBO Max logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/youtube.png"
            alt="Youtube logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/appletv.png"
            alt="Apple TV logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/directtv.png"
            alt="Direct TV logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/MSstore.png"
            alt="Microsoft Store logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/playstore.png"
            alt="Google Playstore logo"
            width="200px"
            height="200px"
          ></img>
        </>
      ) : (
        <>
          <h1> Please login or register to use the app! </h1>
          <p>We know whether it's on:</p>
          <img
            src="../public/logos/netflix.png"
            alt="netflix logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/hboMax.png"
            alt="/HBO Max logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/youtube.png"
            alt="Youtube logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/appletv.png"
            alt="Apple TV logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/directtv.png"
            alt="Direct TV logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/MSstore.png"
            alt="Microsoft Store logo"
            width="200px"
            height="200px"
          ></img>
          <img
            src="../public/logos/playstore.png"
            alt="Google Playstore logo"
            width="200px"
            height="200px"
          ></img>

          <Link to="/users/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/users/register" className="btn btn-primary">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
