import ReviewsItemOfList from "./ReviewsItemOfList";

const ReviewsList = ({reviews}) => {
return (
    <ul id="reviewsList">
        {reviews.map((review)=>{
            return <ReviewsItemOfList key={review.review_id} review={review}/>
        })}
    </ul>
)
}

export default ReviewsList;