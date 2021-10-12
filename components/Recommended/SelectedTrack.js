import React, { useState, useEffect } from "react";
import Genres from "./Genres";
import * as spotify from "../../helpers/spotify";
import axios from "axios";

const SelectedTrack = (props) => {
  const [artistInfo, setArtistInfo] = useState();
  if (props.track) {
    console.log("data from selected track - ", props.track);
  }

  return (
    <div className="selected">
      <div>
        <h4>Seed Track</h4>
      </div>
      <div className="cover">
        <img
          src={props.track.album.images[0].url}
          alt={`${props.track.artists[0].name} cover`}
        />
      </div>
      <div className="artist">
        <strong>Artist: </strong>
        {props.track.artists[0].name}
      </div>
      <div className="song">
        <strong>Track: </strong>
        {props.track.name}
      </div>
      <div className="album">
        <strong>Album: </strong>
        {props.track.album.name}
      </div>

      <Genres genres={props.genres} />
    </div>
  );
};

export default SelectedTrack;
