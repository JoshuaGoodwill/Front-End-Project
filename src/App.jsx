import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar.jsx";
import ReviewsPage from "./components/ReviewsPage";
import IndividualReviewPage from "./components/ReviewPage";
import { useEffect, useState } from "react";
import { fetchCategories } from "./api";

function App() {
  const [categoriesArr, setCategoriesArr] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(({ categories }) => {
        return categories;
      })
      .then((categories) => {
        setCategoriesArr(categories);
      });
  }, []);

  return (
    <BrowserRouter>
      <>
        <Header />
        <Navbar />

        <Routes>
          <Route
            path="/reviews"
            element={<ReviewsPage categoriesArr={categoriesArr} />}
          />
          <Route
            path="/reviews/:review_id"
            element={<IndividualReviewPage />}
          />
          <Route
            path={`/reviews_by_category/:category`}
            element={<ReviewsPage categoriesArr={categoriesArr} />}
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
