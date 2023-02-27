import React, { useState, useEffect } from "react";
import "./Recommendation.css";
import MovieRadarAPI from "../APIs";
import RecommendationCard from "./RecommendationCard";
// import SearchForm from "../forms/SearchForm";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    async function getRecommendations() {
      const res = await MovieRadarAPI.getRecommendation();
      setRecommendations(res);
    }
    getRecommendations();
  }, []);

  // async function search(movie_name) {
  //   const res = await MovieRadarAPI.getMovieSources(movie_name);
  //   setRecommendations(res);
  // }

  return (
    <div id="wrapper">
      <div id="search">{/* <SearchForm search={search} /> */}</div>
      {recommendations
        ? recommendations.map((movie) => {
            return <RecommendationCard movie={movie} key={movie.id} />;
          })
        : "loading........."}
    </div>
  );
};
export default Recommendation;
