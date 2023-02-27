import React, { useState, useEffect } from "react";
import "./WatchList.css";
import MovieRadarAPI from "../APIs";
import WatchListCard from "./WatchListCard";

const WatchList = () => {
  const [watchlist, setWatchList] = useState("");

  useEffect(() => {
    async function getWatchList() {
      const res = await MovieRadarAPI.getWatchList();
      setWatchList(res);
    }
    getWatchList();
  }, []);


  return (
    <div id="wrapper">
      {watchlist
        ? watchlist.map((movie) => {
            return <WatchListCard movie={movie} key={movie.id} />;
          })
        : "loading........."}
    </div>
  );
};
export default WatchList;
