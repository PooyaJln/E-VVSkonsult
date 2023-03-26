import { NavLink } from "react-router-dom";

const HeatLossNav = () => {
  return (
    <nav className="heatLoss-nav-bar">
      <NavLink to="projects">Projects</NavLink>
      <NavLink to="help">Help</NavLink>
    </nav>
  );
};

export default HeatLossNav;
