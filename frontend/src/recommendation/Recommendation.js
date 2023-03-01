import React, { useState, useEffect, useContext } from "react";
import "./Recommendation.css";
import MovieRadarAPI from "../APIs";
import RecommendationCard from "./RecommendationCard";
import userContext from "../helpers/userContext";
import { v4 as uuid } from "uuid";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState("");
  const { currentUser } = useContext(userContext);
  const user_id = currentUser.id;

  useEffect(() => {
    async function getRecData() {
      const res = await MovieRadarAPI.getRecommendation(user_id);
      setRecommendations(res);
    }
    getRecData();
  }, []);
  console.log(currentUser.id);

  return (
    <div id="wrapper">
      {recommendations
        ? recommendations.map((movie) => {
            return <RecommendationCard movie={movie} key={uuid()} />;
          })
        : "loading........."}
    </div>
  );
};
export default Recommendation;
