import { Outlet, useLoaderData } from "react-router-dom";
import BuildingNavBar from "../../layouts/BuildingNavBar";

function Building() {
  const building = useLoaderData();
  return (
    <>
      <h2>Building: {building.building_name}</h2>
      <BuildingNavBar />
      <Outlet />
    </>
  );
}

export default Building;
