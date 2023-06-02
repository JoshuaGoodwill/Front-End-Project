import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIndividualReview } from "../utils";
import CommentsList from "./CommentsList";

const IndividualReviewPage = () => {
  const [review, setReview] = useState({});
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const fullDate = new Date(review.created_at);

  useEffect(() => {
    fetchIndividualReview(review_id)
      .then(({ review }) => {
        return review;
      })
      .then((review) => {
        setReview(review);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p className="loadingMessage">Loading Review...</p>;
  } else {
    return (
      <section id="individualReview">
        <h2 id="reviewTitle">{review.title}</h2>
        <div id="reviewInfo">
        <p>Author: {review.owner}</p>
        <p>Posted: {fullDate.getFullYear()}</p>
        <p>Designed By: {review.designer}</p>
        <p>Genre: {review.category}</p>
        </div>
        <img id="reviewIMG" src={review.review_img_url} />
        <p id="reviewBody">{review.review_body}</p>
        <CommentsList id={review.review_id}/>
      </section>
    );
  }
};

export default IndividualReviewPage;
