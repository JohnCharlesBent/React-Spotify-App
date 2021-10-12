import React, { useState, useEffect } from "react";
import * as spotify from "../../helpers/spotify";
import "./styles.scss";

const NowPlaying = (props) => {
  const [playing, setPlaying] = useState();

  useEffect(() => {
    try {
      spotify.nowPlaying(props.token).then((value) => {
        setPlaying(value);
      });
    } catch (error) {
      console.log("error getting now playing - ", error);
    }
  }, []);
  console.log(playing);
  let progressBarStyles;
  if (playing) {
    progressBarStyles = {
      width: (playing.progress_ms * 100) / playing.item.duration_ms + "%"
    };
  }

  return (
    <>
      {playing && (
        <div className="now-playing">
          <div className="container">
            <strong>Currently Playing:</strong>
            {/* <div className="now-playing-image">
              <img src={playing.item.album.images[0].url} alt="" />
            </div> */}
            <div className="now-playing-artist">
              {playing.item.artists[0].name}
            </div>

            <div className="now-playing-name">{playing.item.name}</div>

            {/* <div className="now-playing-status">
              {playing.is_playing ? "Playing" : "Paused"}
            </div> */}
            {playing && (
              <div className="progress">
                <div className="progress__bar" style={progressBarStyles}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NowPlaying;
