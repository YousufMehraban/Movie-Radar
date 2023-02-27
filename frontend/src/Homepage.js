import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Homepage.css";
import userContext from "./helpers/userContext";
import SearchForm from "./forms/SearchForm";
import MovieRadarAPI from "./APIs";
import HomepageCard from "./HomepageCard";

const HomePage = () => {
  const { currentUser } = useContext(userContext);
  const [movies, setMovies] = useState("");
  const history = useHistory();

  async function search(term) {
    const imdb_id = await MovieRadarAPI.getIMDB(term);
    setMovies( imdb_id);
    // const res = await MovieRadarAPI.getSources(imdb_id);
    // setMovies(res);
    // return history.push("/");
  }

  return (
    <div className="movieRadarHome">
      {currentUser ? (
        <>
          <div id="search">
            <SearchForm search={search} />
          </div>

        <h1>{movies}</h1>
          {/* {movies.map((movie) => {
                return <HomepageCard movie={movie} />;
              })
            } */}

          <h1> Welcome to Movie Radar! </h1>
          <br></br>
          <br></br>
          <p>We know whether it's on:</p>
          <img
            src="/logos/netflix.png"
            alt="netflix logo"
            className="img-logo"
          />
          <img
            src="/logos/hboMax.png"
            alt="/HBO Max logo"
            className="img-logo"
          />
          <img
            src="/logos/youtube.png"
            alt="Youtube logo"
            className="img-logo"
          />
          <img
            src="/logos/appletv.png"
            alt="Apple TV logo"
            className="img-logo"
          />
          <img
            src="/logos/directtv.png"
            alt="Direct TV logo"
            className="img-logo"
          />
          <img
            src="/logos/MSstore.png"
            alt="Microsoft Store logo"
            className="img-logo"
          />
          <img
            src="/logos/playstore.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/hulu.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/hbo.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/itunes.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/peacock.png"
            alt="Google Playstore logo"
            className="img-logo"
          />

          <footer>
            <hr></hr>
            <p class="about">
              <a href="/">Home</a> |{" "}
              <a href="mailto:yousufmehraban@yahoo.com">Contact Us </a>
            </p>
            <p>© Copyright 2023 - Yousuf Mehraban</p>
          </footer>
        </>
      ) : (
        <>
          <h1> Please login or register to use the app! </h1>
          <br></br>
          <br></br>
          <p>We know whether it's on:</p>
          <img
            src="/logos/netflix.png"
            alt="netflix logo"
            className="img-logo"
          />
          <img
            src="/logos/hboMax.png"
            alt="/HBO Max logo"
            className="img-logo"
          />
          <img
            src="/logos/youtube.png"
            alt="Youtube logo"
            className="img-logo"
          />
          <img
            src="/logos/appletv.png"
            alt="Apple TV logo"
            className="img-logo"
          />
          <img
            src="/logos/directtv.png"
            alt="Direct TV logo"
            className="img-logo"
          />
          <img
            src="/logos/MSstore.png"
            alt="Microsoft Store logo"
            className="img-logo"
          />
          <img
            src="/logos/playstore.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/hulu.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/hbo.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/itunes.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          <img
            src="/logos/peacock.png"
            alt="Google Playstore logo"
            className="img-logo"
          />
          {/* <br></br>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link> */}



          <footer>
            <hr></hr>
            <p class="about">
              <a href="/">Home</a> |{" "}
              <a href="mailto:yousufmehraban@yahoo.com">Contact Us </a>
            </p>
            <p>© Copyright 2023 - Yousuf Mehraban</p>
          </footer>

        </>
      )}
    </div>
  );
};

export default HomePage;
