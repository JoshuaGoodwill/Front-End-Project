import ReviewsItemOfList from "./ReviewsItemOfList";

const ReviewsList = ({ reviews, category }) => {
  return (
    <ul id="reviewsList">
      {reviews.map((review) => {
        if (!category) {
          return <ReviewsItemOfList key={review.review_id} review={review} />;
        } else if (review.category === category) {
          return <ReviewsItemOfList key={review.review_id} review={review} />;
        } 
      })}
    </ul>
  );
};

export default ReviewsList;
