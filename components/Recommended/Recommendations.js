import React, { userEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_arrow_right_alt } from "react-icons-kit/md/ic_arrow_right_alt";
import "./styles.scss";

const Tracks = (props) => {
  const handlePreview = (event) => {
    event.preventDefault();
    const location = event.target.href;
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=400,height=400,left=-1000,top=-1000`;
    return window.open(location, "preview", params);
  };

  const tracklist = props.tracks.map((item, idx) => {
    console.log(item);
    return (
      <li className="track" key={idx}>
        <div className="cover-img">
          <img
            src={item.album.images[0].url}
            alt={`${item.album.name} cover`}
          />
        </div>
        <div className="data">
          <div className="name">
            <strong>Artist: </strong>
            {item.artists[0].name}
          </div>
          <div className="name">
            <strong>Song: </strong>
            {item.name}
          </div>
          <div className="album-name">
            <strong>Album: </strong>
            {item.album.name}
          </div>
        </div>
        <div className="buttons">
          {item.preview_url && (
            <a
              id="preview"
              className="button"
              href={item.preview_url}
              target="_blank"
              rel="noreferrer"
              onClick={handlePreview}
            >
              Preview Track
            </a>
          )}
          <a
            className="button"
            href={item.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            Play Track
          </a>
        </div>
      </li>
    );
  });

  return (
    <div className="tracks">
      {props.tracks.length && <ul className="tracklist">{tracklist}</ul>}
      {!props.tracks.length && (
        <h3>Looks like you've reached the end of the road, bub...</h3>
      )}
    </div>
  );
};

export default Tracks;
