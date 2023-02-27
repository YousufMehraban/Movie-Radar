import React, { useState, useEffect } from "react";
import "./WatchList.css";
import MovieRadarAPI from "../APIs";
import WatchListCard from "./WatchListCard";
// import SearchForm from "../forms/SearchForm";

const WatchList = () => {
  const [watchlist, setWatchList] = useState("");

  useEffect(() => {
    async function getWatchList() {
      const res = await MovieRadarAPI.getWatchList();
      setWatchList(res);
    }
    getWatchList();
  }, []);

  // async function search(movie_name) {
  //   const res = await MovieRadarAPI.getMovieSources(movie_name);
  //   setWatchList(res);
  // }

  return (
    <div id="wrapper">
      <div id="search">{/* <SearchForm search={search} /> */}</div>
      {watchlist
        ? watchlist.map((movie) => {
            return <WatchListCard movie={movie} key={movie.id} />;
          })
        : "loading........."}
    </div>
  );
};
export default WatchList;
