import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import MovieRadarAPI from "./APIs";
import "./App.css";
import NavBar from "./Navbar";
import Routes from "./Routes";
import userContext from "./helpers/userContext";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./helpers/useLocalStorage";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useLocalStorage("userToken");
  const [infoLoaded, setInfoLoaded] = useState(false);

  async function logIn(data) {
    const res = await MovieRadarAPI.login(data);
    setToken(res);
    MovieRadarAPI.token = res;
  }

  async function signUp(data) {
    const res = await MovieRadarAPI.register(data);
    setToken(res);
    MovieRadarAPI.token = res;
  }

  function logOut() {
    setCurrentUser(null);
    setToken(null);
    MovieRadarAPI.token = null;
  }

  useEffect(() => {
    async function getUser() {
      if (token) {
        let { username } = jwt.decode(token);
        MovieRadarAPI.token = token;
        const res = await MovieRadarAPI.getUser(username);
        setCurrentUser(res);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getUser();
  }, [token]);

  if (!infoLoaded) return "loading...";
  return (
    <BrowserRouter>
      <userContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <NavBar logOut={logOut} />
          <Routes logIn={logIn} signUp={signUp} />
        </div>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
