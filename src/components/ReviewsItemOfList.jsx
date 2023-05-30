const ReviewsItemOfList = ({review}) => {
    const fullDate = new Date(review.created_at);

return (
    <li className="reviewsListItem">
        <h3 className="individualReviewTitle">{review.title}</h3>
        <p>Author: {review.owner}</p>
        <p>Posted: {fullDate.getFullYear()}</p> 
        <p>Votes: {review.votes}</p>
        <img className="individualReviewImage" src={review.review_img_url}/>
    </li>
)
}

export default ReviewsItemOfList;