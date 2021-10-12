import React, { useEffect, useState } from "react";
import Recommendations from "./Recommendations";
import SelectedTrack from "./SelectedTrack";
import * as spotify from "../../helpers/spotify";
import "./styles.scss";

const Recommended = (props) => {
  // console.log("props from recommended - ", props);
  const [recommended, setRecommended] = useState();
  const [track, setTrack] = useState();

  useEffect(() => {
    try {
      spotify
        .getRecommendations(
          props.token,
          props.selected.artistId,
          props.selected.trackId,
          props.genres
        )
        .then((value) => {
          setRecommended(value);
        });
    } catch (error) {
      // console.log("error from Recommended - ", error);
    }
  }, []);

  useEffect(() => {
    try {
      spotify
        .getTrackData(props.token, props.selected.trackId)
        .then((value) => {
          // console.log(value);
          setTrack(value);
        });
    } catch (error) {
      console.log("error from Selected Track - ", error);
    }
  }, []);

  console.log(recommended);

  return (
    <div className="recommended-tracks">
      <div className="container">
        <h2>Your Recommended Tracks</h2>
        <div className="wrapper">
          {track && <SelectedTrack track={track} genres={props.genres} />}
          {recommended && <Recommendations tracks={recommended.tracks} />}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
