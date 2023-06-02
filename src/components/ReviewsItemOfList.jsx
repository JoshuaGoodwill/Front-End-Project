import { Link } from "react-router-dom";
import Vote from "./Vote";

const ReviewsItemOfList = ({ review }) => {
  const fullDate = new Date(review.created_at);

  return (
    <li className="reviewsListItem">
      <h3 className="individualReviewTitle">{review.title}</h3>
      <p>Author: {review.owner}</p>
      <p>Posted: {fullDate.getFullYear()}</p>
      <p>Votes: {review.votes}</p>
      <Vote id={review.review_id} votes={review.votes} />
      <img className="individualReviewImage" src={review.review_img_url} />
      <Link to={`/reviews/${review.review_id}`} className="reviewLink">
        Click To Go To Review
      </Link>
    </li>
  );
};

export default ReviewsItemOfList;
