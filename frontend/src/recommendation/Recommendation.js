import React, { useState, useEffect } from "react";
import "./Recommendation.css";
import MovieRadarAPI from "../APIs";
import RecommendationCard from "./RecommendationCard";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    async function getRecommendations() {
      const res = await MovieRadarAPI.getRecommendation();
      setRecommendations(res);
    }
    getRecommendations();
  }, []);

  return (
    <div id="wrapper">
      {recommendations
        ? recommendations.map((movie) => {
            return <RecommendationCard movie={movie} key={movie.id} />;
          })
        : "loading........."}
    </div>
  );
};
export default Recommendation;
