import { NavLink } from "react-router-dom";

const ProjectNavBar = () => {
  return (
    <nav className="project-nav-bar">
      <NavLink to="temperatures">Temperatures</NavLink>
      <NavLink to="thermalParameters">Thermal Parameters</NavLink>
      <NavLink to="materials">Materials</NavLink>
      <NavLink to="buildings">Buildings</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default ProjectNavBar;
