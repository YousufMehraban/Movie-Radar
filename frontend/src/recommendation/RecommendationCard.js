import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import "./Recommendation.css";

const RecommendationCard = ({ movie }) => {
  return (
    <Card key={movie.id}>
      <img alt="movie poster" src={movie.poster} />
      <Link to={`/recommendation`}>
        <CardTitle tag="h3">{movie.movie_name}</CardTitle>
        <CardText tag="p">{movie.platform}</CardText>
        <CardText tag="p">{movie.release_year}</CardText>
        <CardText tag="p">{movie.rating}</CardText>
      </Link>
    </Card>
  );
};
export default RecommendationCard;
