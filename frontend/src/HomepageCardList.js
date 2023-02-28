import React from "react";
import HomepageCard from "./HomepageCard";
import "./Homepage.css";

const HomepageCardList = ({ sources, details }) => {
  return (
    <div id="wrapper">
      {sources && details
        ? sources.map((movie) => {
            return <HomepageCard movie={movie} details={details} />;
          })
        : ""}
    </div>
  );
};

export default HomepageCardList;
