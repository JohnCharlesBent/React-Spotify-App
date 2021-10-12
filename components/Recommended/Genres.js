import React, { useEffect, useState } from "react";
import * as giphy from "../../helpers/giphy";

const Genres = (props) => {
  const [gif, setGif] = useState("");

  const genreList = props.genres.map((item, idx) => {
    // console.log(item.genre);
    return (
      <li className="genre" key={idx}>
        {item}
      </li>
    );
  });

  // useEffect(() => {
  //   let query = props.genres[0];
  //   let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${query}$limit=1`;
  //   return giphy.getGif(url).then((value) => {
  //     setGif(value[10]);
  //   });
  // }, []);

  // if (gif) {
  //   console.log("gif data - ", gif);
  // }

  console.log("props from Genres component - ", props);
  return (
    <div className="genres-list">
      <h4>Seed Genres</h4>
      <ul>{genreList}</ul>
      {/* {gif && (
        <div className="related-gif">
          <h4>GIF related to "{props.genres[0]}"</h4>
          <img src={gif.images.original.url} alt="" />
        </div>
      )} */}
    </div>
  );
};

export default Genres;
