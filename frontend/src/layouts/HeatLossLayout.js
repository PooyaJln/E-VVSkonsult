import { Outlet } from "react-router-dom";
import HeatLossNav from "./HeatLossNav";

function HeatLossLayout() {
  return (
    <>
      <HeatLossNav />
      <div className="heat-loss-layout">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default HeatLossLayout;
