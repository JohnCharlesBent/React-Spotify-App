import axios from "axios";

export function auth() {
  const auth_url = process.env.AUTH_URL;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect = process.env.REDIRECT_URI;
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-read-private",
    "user-top-read"
  ];

  const scope = scopes.join("%20");

  return (window.location = `${auth_url}?client_id=${client_id}&redirect_uri=${redirect}&scope=${scope}&response_type=token&show_dialog=true`);
}

export function getHash() {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      if (item) {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
}

export function getUser(token) {
  return axios
    .get(process.env.ME_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    });
}

export function getRecent(token, url = null) {
  let now = new Date();
  let pastDate = now.getDate() - 365;
  now.setDate(pastDate);
  const timestamp = now.getTime();
  const apiUrl = url
    ? url
    : `${process.env.RECENT_URL}?limit=10&after=${timestamp}`;
  return axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    });
}

export function getGenres(token, artistId) {
  const url = `${process.env.ARTISTS_URL}${artistId}`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    .then((res) => {
      // console.log("genre response data - ", res.data);
      return res.data;
    });
}

export function getRecommendations(token, artistId, trackId, trackGenres) {
  const genres = encodeURIComponent(
    `${trackGenres[0]} ${trackGenres[1]} ${trackGenres[2]}`
  );
  // console.log(genres);
  const url = `https://api.spotify.com/v1/recommendations?limit=20&market=ES&seed_artist=${artistId}&seed_genres=${trackGenres[0]}&seed_tracks=${trackId}`;
  console.log(url);
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    .then((res) => {
      // console.log("response from getRecommendations - ", res);
      return res.data;
    });
}

export function getTrackData(token, trackId) {
  const url = `${process.env.TRACKS_URL}${trackId}`;
  console.log(url);
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
}

export function nowPlaying(token) {
  const url = process.env.PLAYER_URL;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    .then((res) => {
      // console.log(res);
      return res.data;
    });
}
