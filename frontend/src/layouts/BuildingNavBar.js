import { NavLink } from "react-router-dom";

const BuildingNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="floors">Floors</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default BuildingNavBar;
