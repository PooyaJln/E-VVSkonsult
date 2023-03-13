import { NavLink } from "react-router-dom";

const HeatLossNav = () => {
  return (
    <nav className="heatLoss-nav-bar">
      <NavLink to="projects">Projects</NavLink>
      <NavLink to="thermalParameters">Thermal Parameters</NavLink>
      <NavLink to="materials">Materials</NavLink>
      <NavLink to="buildings">Buildings</NavLink>
      <NavLink to="floors">Floors</NavLink>
      <NavLink to="apartments">Apartments</NavLink>
      <NavLink to="rooms">Rooms</NavLink>
      <NavLink to="roomBoundaries">Room Boundaries</NavLink>
      <NavLink to="results">Results</NavLink>
    </nav>
  );
};

export default HeatLossNav;
