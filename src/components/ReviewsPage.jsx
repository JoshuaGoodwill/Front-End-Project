import { useState, useEffect } from "react";
import { fetchReviews } from "../api";
import ReviewsList from "./ReviewsList";
import { NavLink, useParams } from "react-router-dom";

const ReviewsPage = ({ categoriesArr }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    fetchReviews()
      .then(({reviews}) => {
        setReviews(reviews);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="loadingMessage">Loading reviews...</p>;
  } else {
    return (
      <section id="reviews">
        <div id="reviewsContainer">
          <h2 id="reviewsTitle">Reviews</h2>
          <h2 id="categoryTitle">By Category</h2>
          <nav id="categoryNavbar">
            <NavLink className="categoryLink" to="/reviews">
              All
            </NavLink>
            {categoriesArr.map((category) => {
              return (
                <NavLink
                  className="categoryLink"
                  key={category.slug}
                  to={`/reviews_by_category/${category.slug}`}
                >
                  {category.slug}
                </NavLink>
              );
            })}
          </nav>
          <ReviewsList id="reviewsList" reviews={reviews} category={category} />
        </div>
      </section>
    );
  }
};

export default ReviewsPage;
