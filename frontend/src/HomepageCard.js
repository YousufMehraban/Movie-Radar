import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import MovieRadarAPI from "./APIs";
import "./Homepage.css";
import MovieDetail from "./MovieDetail";

const HomepageCard = ({ movie, details }) => {

  async function geetMovieDetail(){
    const res = await MovieRadarAPI.getDetails()
  }
  return (
    <Card key={movie.source_id}>
      {/* <MovieDetail imdb_id={details.imdb_id} />; */}
      <a href={movie.web_url}>
        <CardTitle tag="h1"> {movie.name}</CardTitle>
      </a>
      <a href={details.trailer} size="sm">
        <CardText tag="h6">&#9658; Watch Trailer</CardText>
      </a>
      <a href={movie.web_url} className="btn btn" size="sm">
        <CardText>Click to Rent</CardText>
      </a>
      <a href="/movie" className="btn btn" size="sm">
        <CardText>View Details</CardText>
      </a>
      <img src={details.poster} id="posterImage" />
    </Card>
  );
};
export default HomepageCard;
