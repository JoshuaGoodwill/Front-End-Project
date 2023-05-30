import {useState, useEffect} from "react";
import { fetchReviews } from "../utils";
import ReviewsList from "./ReviewsList";

const ReviewsPage = () => {
const [reviews, setReviews] = useState([]);

useEffect(() => {
    fetchReviews().then(({reviews}) => {
        return reviews;
    }).then((reviews) => {
        setReviews(reviews);
    })
})



return (
    <section id="reviews">
        <h2 id="reviewsTitle">Reviews</h2>
        <ReviewsList reviews={reviews}/>
    </section>
)


};


export default ReviewsPage;
