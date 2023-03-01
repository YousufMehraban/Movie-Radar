import React, { useState, useEffect, useContext } from "react";
import "./WatchList.css";
import MovieRadarAPI from "../APIs";
import WatchListCard from "./WatchListCard";
import userContext from "../helpers/userContext";
import { v4 as uuid } from "uuid";

const WatchList = () => {
  const [watchlist, setWatchList] = useState("");
  const { currentUser } = useContext(userContext);
  const user_id = currentUser.id;
  useEffect(() => {
    async function getWatchList() {
      const res = await MovieRadarAPI.getWatchList(user_id);
      setWatchList(res);
    }
    getWatchList();
  }, []);

  return (
    <div id="wrapper">
      {watchlist
        ? watchlist.map((movie) => {
            return <WatchListCard movie={movie} key={uuid()} />;
          })
        : "loading........."}
    </div>
  );
};
export default WatchList;
