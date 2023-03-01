import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import MovieRadarAPI from "./APIs";
import userContext from "./helpers/userContext";
import "./Homepage.css";
import { v4 as uuid } from "uuid";

const MovieDetail = () => {
  const { movieDetails, currentUser } = useContext(userContext);
  const user_id = currentUser.id;
  const movie_name = movieDetails.title;
  const poster = movieDetails.poster;
  const rating = movieDetails.user_rating;
  const release_year = movieDetails.year;
  const imdb_id = movieDetails.imdb_id;

  async function handleClickRec(e) {
    e.preventDefault();
    await MovieRadarAPI.addToRecommendation({
      movie_name,
      poster,
      rating,
      release_year,
      imdb_id,
      user_id,
    });
  }
  async function handleClickWatch(e) {
    e.preventDefault();
    await MovieRadarAPI.addToWatchList({
      movie_name,
      poster,
      rating,
      release_year,
      imdb_id,
      user_id,
    });
  }

  return (
    <div id="wrapper">
      <Card key={uuid()}>
        <CardTitle tag="h1"> {movieDetails.title}</CardTitle>
        <CardText tag="h6">{movieDetails.type}</CardText>
        <img src={movieDetails.poster} id="posterImage" />
        <a href={movieDetails.trailer} size="sm">
          <CardText tag="h5">&#9658; Watch Trailer</CardText>
        </a>
        <CardText tag="h6">
          {" "}
          Release_Date: <b>{movieDetails.release_date}</b>
        </CardText>
        <CardText tag="h6">
          {" "}
          Users Rating: <b>{movieDetails.user_rating}</b>
        </CardText>
        <CardText tag="h6">
          {" "}
          Language: <b>{movieDetails.original_language}</b>
        </CardText>
        <CardText tag="h6">
          {" "}
          Genre: <b>{movieDetails.genre_names}</b>
        </CardText>

        <Button
          className="btn btn-primary"
          size="sm"
          style={{ margin: "3px", width: "100%" }}
          onClick={handleClickWatch}
        >
          Add to Watchlist
        </Button>
        <Button
          className="btn btn-primary"
          size="sm"
          style={{ margin: "3px", width: "100%" }}
          onClick={handleClickRec}
        >
          Add to Recommendation
        </Button>
      </Card>
    </div>
  );
};
export default MovieDetail;
