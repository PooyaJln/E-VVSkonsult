import { NavLink } from "react-router-dom";

const FloorNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="apartments">Apartments</NavLink>
      <NavLink to="rooms">Rooms</NavLink>
      <NavLink to="roomBoundaries">Room Boundaries</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default FloorNavBar;
