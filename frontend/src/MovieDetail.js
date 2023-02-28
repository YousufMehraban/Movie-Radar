import React, { useEffect } from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import MovieRadarAPI from "./APIs";
import "./Homepage.css";

const MovieDetail = ( imdb_id ='tt0479143') => {
  const [movie, setMovie] = useEffect("");

    useEffect(() => {
      async function getDetails() {
        const res = await MovieRadarAPI.getDetails(imdb_id);
        setMovie(res);
      }
      getDetails();
    }, []);



  return (
    <div>
      {movie ? (
        <Card key={movie.id}>
          <CardTitle tag="h1"> {movie.title}</CardTitle>
          <a href={movie.trailer} size="sm">
            <CardText tag="h6">&#9658; Watch Trailer</CardText>
          </a>
          <img src={movie.poster} id="posterImage" />
          <CardText tag="h6"> Genre: {movie.genre_names}</CardText>
          <CardText tag="h6"> Release_year: {movie.year}</CardText>
          <CardText tag="h6"> Rating: {movie.user_rating}</CardText>
        </Card>
      ) : (
        "loading.....++++"
      )}
    </div>
  );
};
export default MovieDetail;
