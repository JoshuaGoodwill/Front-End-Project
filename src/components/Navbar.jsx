import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="Navbar">
      <NavLink to="/home" className="NavbarLink">Home Page</NavLink>
      <NavLink to="/reviews" className="NavbarLink">All Reviews</NavLink>
    </nav>
  );
};

export default Navbar;
