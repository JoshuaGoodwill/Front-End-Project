import axios from "axios";

const games = axios.create({
  baseURL: "https://backend-project-49yh.onrender.com/api/",
});

const fetchReviews = () => {
  return games
    .get("/reviews")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export {fetchReviews}
