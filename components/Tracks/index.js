import React, { userEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_arrow_right_alt } from "react-icons-kit/md/ic_arrow_right_alt";
import "./styles.scss";

const Tracks = (props) => {
  // console.log("props from Tracks - ", props);
  console.log("tracks in tracks - ", props.tracks);
  const tracklist = props.tracks.map((item, idx) => {
    // console.log(item);
    return (
      <li className="track" key={idx}>
        <div className="cover-img">
          <img
            src={item.track.album.images[0].url}
            alt={`${item.track.album.name} cover`}
          />
        </div>
        <div className="data">
          <div className="name">
            <strong>Artist: </strong>
            {item.track.artists[0].name}
          </div>
          <div className="name">
            <strong>Song: </strong>
            {item.track.name}
          </div>
          <div className="album-name">
            <strong>Album: </strong>
            {item.track.album.name}
          </div>
        </div>
        <div id="button">
          <Link to="/recommended">
            <button
              className="track-button"
              data-artistid={item.track.artists[0].id}
              data-artistname={item.track.artists[0].name}
              data-trackid={item.track.id}
              onClick={props.handleSelectedTrack}
            >
              Select this track <Icon icon={ic_arrow_right_alt} />
            </button>
          </Link>
        </div>
      </li>
    );
  });

  return (
    <div className="tracks">
      <div className="container">
        {props.tracks && <ul className="tracklist">{tracklist}</ul>}
        {props.tracks.length === 0 && (
          <h3>Looks like you've reached the end of the road, bub...</h3>
        )}
      </div>
    </div>
  );
};

export default Tracks;
