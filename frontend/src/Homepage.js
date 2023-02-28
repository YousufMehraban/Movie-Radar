import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import userContext from "./helpers/userContext";
import SearchForm from "./forms/SearchForm";
import MovieRadarAPI from "./APIs";
import HomepageCardList from "./HomepageCardList";

const HomePage = () => {
  const { currentUser } = useContext(userContext);
  const [details, setDetails] = useState(null);
  const [sources, setSources] = useState(null);

  async function search(term) {
    const imdb_id = await MovieRadarAPI.getIMDB(term);
    const resSources = await MovieRadarAPI.getSources(imdb_id);
    const resDetails = await MovieRadarAPI.getDetails(imdb_id);
    setSources(resSources);
    setDetails(resDetails);
  }

  return (
    <div className="movieRadarHome">
      {currentUser ? (
        <>
          <div id="search">
            <SearchForm search={search} />
            <Link to={"/movies"}>
              <HomepageCardList sources={sources} details={details} />
            </Link>
          </div>

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
            src="/logos/disney+.png"
            alt="Disney + logo"
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
          <img src="/logos/hulu.png" alt="Hulu logo" className="img-logo" />

          <img src="/logos/espn.png" alt="ESPN logo" className="img-logo" />
          <img
            src="/logos/peacock.png"
            alt="Peacock logo"
            className="img-logo"
          />
          <img
            src="/logos/shudder.png"
            alt="Shudder logo"
            className="img-logo"
          />
          <img
            src="/logos/paramount.png"
            alt="Paramount logo"
            className="img-logo"
          />

          <footer>
            <hr></hr>
            <p className="about">
              <a href="/">Home</a> |{" "}
              <a href="mailto:yousufmehraban@yahoo.com">Contact Us </a>
            </p>
            <p>© Copyright 2023 - Yousuf Mehraban</p>
          </footer>
        </>
      ) : (
        <>
          <h1> Welcome to Movie Radar! </h1>

          <h4> Please login or register to use the app! </h4>
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
            src="/logos/disney+.png"
            alt="Disney + logo"
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
          <img src="/logos/hulu.png" alt="Hulu logo" className="img-logo" />

          <img src="/logos/espn.png" alt="ESPN logo" className="img-logo" />
          <img
            src="/logos/peacock.png"
            alt="Peacock logo"
            className="img-logo"
          />
          <img
            src="/logos/shudder.png"
            alt="Shudder logo"
            className="img-logo"
          />
          <img
            src="/logos/paramount.png"
            alt="Paramount logo"
            className="img-logo"
          />

          <footer>
            <hr></hr>
            <p className="about">
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
