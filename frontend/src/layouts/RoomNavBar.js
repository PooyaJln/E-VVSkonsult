import { NavLink } from "react-router-dom";

const RoomNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="roomBoundaries">Room Boundaries</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default RoomNavBar;
