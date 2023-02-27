import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import MovieRadarAPI from "./APIs";
import "./watchlist/WatchList.css";

const HomepageCard = ({ imdb_id }) => {
  console.log("*******++++>>>>", imdb_id);
  const [sources, setSources] = useState("");
  useEffect(() => {
    async function getSources() {
      const res = await MovieRadarAPI.getSources(imdb_id);
      setSources(res);
    }
    getSources();
  }, []);

  return (
    <div>
      {sources
        ? sources.map((source) => {
            return (
              <Card key={source.source_id}>
                <img alt="movie poster" src={source.web_url} />
                <Link to={`/`}>
                  <CardTitle tag="h2"> {source.name}</CardTitle>
                  <CardText tag="h6">
                    type: {source.type} | price: {source.price}
                  </CardText>
                </Link>
              </Card>
            );
          })
        : "loading...."}
    </div>
  );
};
export default HomepageCard;
