import React from "react";
import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className="global-nav-bar">
      <h1>heatLossApp</h1>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/heat-loss">Heat Loss Calculations</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
};

export default MainNavbar;
