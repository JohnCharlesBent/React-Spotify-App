import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Tracks from "../Tracks";
import * as spotify from "../../helpers/spotify";
import { Icon } from "react-icons-kit";
import { ic_flip_camera_android_outline } from "react-icons-kit/md/ic_flip_camera_android_outline";
import "./styles.scss";

const Recent = (props) => {
  const [recent, setRecent] = useState();
  const [trackType, setTrackType] = useState("Recently Played Tracks");
  const appToken = localStorage.getItem("token");
  console.log(appToken);
  useEffect(() => {
    try {
      spotify.getRecent(appToken).then((value) => {
        setRecent(value);
      });
    } catch (err) {
      console.log("error getting tracks - ", err);
    }
  }, []);

  const loadMoreTracks = (event) => {
    const url = event.target.dataset.url;
    setRecent();
    try {
      spotify.getRecent(props.token, url).then((value) => {
        setRecent(value);
      });
    } catch (err) {
      console.log("error getting-tracks - ", err);
    }
  };

  return (
    <>
      <div className="recent">
        <div className="container">
          <h2 className="recent-header">
            Your Recently {trackType}
            <div id="buttons">
              {recent && (
                <button
                  id="moreTracks"
                  data-url={recent.next}
                  onClick={loadMoreTracks}
                >
                  Load More Tracks{" "}
                  <Icon icon={ic_flip_camera_android_outline} />
                </button>
              )}
            </div>
          </h2>
          <div>
            {recent && (
              <Tracks
                tracks={recent.items}
                nextUrl={recent.next}
                handleSelectedTrack={props.handleSelectedTrack}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recent;
