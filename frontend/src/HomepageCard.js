import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import "./watchlist/WatchList.css";
import "./Homepage.css";

const HomepageCard = ({ movie }) => {
  console.log("MOVIE*******++++>>>>", movie);
  console.log("URL*******++++>>>>", movie.web_url);

  return (
    // <div className="movieRadarHome">
    <Card key={movie.source_id} className="movieCards">
      <iframe src={movie.web_url}></iframe>
      {/* <img alt="movie poster" src={movie.web_url} /> */}
      <a href={movie.web_url}>
        <CardTitle tag="h2"> {movie.name}</CardTitle>
      </a>
      <CardText tag="h6">
        type: {movie.type} | price: {movie.price}
      </CardText>
    </Card>
    // </div>
  );
};
export default HomepageCard;
