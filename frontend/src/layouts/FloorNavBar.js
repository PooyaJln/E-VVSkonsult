import { NavLink } from "react-router-dom";

const FloorNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="apartments">Apartments</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default FloorNavBar;
