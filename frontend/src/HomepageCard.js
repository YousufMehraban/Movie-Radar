import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import "./watchlist/WatchList.css";

const HomepageCard = ({ movie }) => {
  return (
    <Card key={movie.source_id}>
      <img alt="movie poster" src={movie.web_url} />
      <Link to={`/`}>
        <CardTitle tag="h2"> {movie.name}</CardTitle>
        <CardText tag="h6">
          type: {movie.type} | price: {movie.price}
        </CardText>
      </Link>
    </Card>
  );
};
export default HomepageCard;
