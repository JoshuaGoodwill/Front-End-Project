import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar.jsx";
import ReviewsPage from "./components/ReviewsPage";

function App() {
  return (
    <BrowserRouter>
    <>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/reviews" element={<ReviewsPage/>} />
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
