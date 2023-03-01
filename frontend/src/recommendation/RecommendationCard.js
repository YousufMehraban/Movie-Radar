import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import { v4 as uuid } from "uuid";

const RecommendationCard = ({ movie }) => {
  return (
    <Card key={uuid()}>
      <img alt="movie poster" src={movie.poster} />
      <Link to={`/recommendation`}>
        <CardTitle tag="h2"> {movie.movie_name}</CardTitle>
        <CardText tag="h6">
          release_year: {movie.release_year} | rating: {movie.rating}
        </CardText>
      </Link>
    </Card>
  );
};
export default RecommendationCard;
