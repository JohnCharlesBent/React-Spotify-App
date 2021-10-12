import axios from "axios";

export function getGif(url) {
  console.log("gifphy url", url);
  return axios
    .get(url)
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
    .then((res) => {
      // console.log(res.data);
      return res.data.data;
    });
}
