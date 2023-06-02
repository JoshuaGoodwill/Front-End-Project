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

const fetchIndividualReview = (id) => {
  return games
    .get(`/reviews/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchComments = (id) => {
  return games
    .get(`/reviews/${id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};


const fetchUsers = () => {
  return games
    .get("/users")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const postComment = (id, username, commentBody) => {
  return games
    .post(`/reviews/${id}/comments`, {
      username: username,
      body: commentBody,
    })
    .then((response) => {
      return response.data;
    })
};

const patchVote = (id, amount) => {
  return games
    .patch(`/reviews/${id}`, { inc_votes: amount })
    .then((response) => {
      return response.data;
    });
};

export { fetchReviews, fetchIndividualReview, fetchComments, postComment, patchVote, fetchUsers };
