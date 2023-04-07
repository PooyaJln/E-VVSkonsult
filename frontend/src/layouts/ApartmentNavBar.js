import { NavLink } from "react-router-dom";

const ApartmentNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="rooms">Rooms</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default ApartmentNavBar;
