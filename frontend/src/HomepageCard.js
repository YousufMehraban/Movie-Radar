import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import "./Homepage.css";
import { v4 as uuid } from "uuid";
const HomepageCard = ({ sources, details }) => {
  return (
    <div id="wrapper">
      {sources && details
        ? sources.map((movie) => {
            return (
              <Card key={uuid()}>
                <a href={movie.web_url}>
                  <CardTitle tag="h1"> {movie.name}</CardTitle>
                </a>
                <a href={details.trailer} size="sm">
                  <CardText tag="h6">&#9658; Watch Trailer</CardText>
                </a>
                <a href={movie.web_url} className="btn btn" size="sm">
                  <CardText>Click to Rent</CardText>
                </a>
                <Link to="movie/:movie_id" className="btn btn" size="sm">
                  <CardText>View Details</CardText>
                </Link>
                <img src={details.poster} id="posterImage" />
              </Card>
            );
          })
        : ""}
    </div>
  );
};
export default HomepageCard;
