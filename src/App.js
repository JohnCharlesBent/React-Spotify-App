import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Login from "../components/Login";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Header from "../components/Header";
import Recent from "../components/Recent";
import Recommended from "../components/Recommended";
// import NowPlaying from "../components/NowPlaying";
import * as spotify from "../helpers/spotify";
import "./styles.scss";

const hash = spotify.getHash();
window.location.hash = "";

export default function App() {
  // State
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState();
  const [genres, setGenres] = useState();

  const handleLogin = () => {
    spotify.auth();
  };

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      setToken({
        token: _token
      });
      localStorage.setItem("token", _token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setLoader(true);
      spotify.getUser(token.token).then((value) => {
        setUser(value);
        setLoader(false);
      });
    }
  }, [token]);

  const handleSelectedTrack = (event) => {
    setLoader(true);

    setSelectedTrack({
      artistId: event.target.dataset.artistid,
      trackId: event.target.dataset.trackid,
      artistname: event.target.dataset.artistname
    });

    spotify
      .getGenres(token.token, event.target.dataset.artistid)
      .then((value) => {
        setGenres(value.genres);
      });

    setLoader(false);
  };

  const handleError = () => {
    return setError(false);
  };

  return (
    <div className="App">
      <div>
        {error && <Error handleError={handleError} />}
        {loader && <Loader />}
        {user.display_name && <Header user={user} />}
        {/* {user.display_name && <NowPlaying token={token.token} />} */}
        <Switch>
          {!token && !error && (
            <Route
              exact
              path="/"
              render={(props) => <Login {...props} handleLogin={handleLogin} />}
            />
          )}
          {user.display_name && (
            <Route
              path="/recent"
              render={(props) => (
                <Recent
                  {...props}
                  token={token.token}
                  handleSelectedTrack={handleSelectedTrack}
                />
              )}
            />
          )}
          {selectedTrack && genres && (
            <Route
              path="/recommended"
              render={(props) => (
                <Recommended
                  {...props}
                  token={token.token}
                  selected={selectedTrack}
                  genres={genres}
                />
              )}
            />
          )}
        </Switch>
      </div>
    </div>
  );
}
