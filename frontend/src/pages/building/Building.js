import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import BuildingNavBar from "../../layouts/BuildingNavBar";

function Building() {
  const project = useOutletContext();
  const building = useLoaderData();
  return (
    <>
      {/* <h2>Project: {project && project.project_name}: </h2> */}
      <h2>Building: {building.building_name}</h2>
      <BuildingNavBar />
      <Outlet context={[building, project]} />
    </>
  );
}

export default Building;
