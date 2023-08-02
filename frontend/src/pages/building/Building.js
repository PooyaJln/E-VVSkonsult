import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import BuildingNavBar from "../../layouts/BuildingNavBar";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { useEffect } from "react";

function Building() {
  const building_id = useParams().building_id;

  const { state, apiCalls } = useBuildingsContext();
  const building = state?.building || {};
  useEffect(() => {
    apiCalls.getBuilding(building_id);
  }, [building_id]);
  return (
    <>
      {/* <h2>Project: {project && project.project_name}: </h2> */}
      <h2>Building: {building?.building_name}</h2>
      <BuildingNavBar />
      <Outlet />
    </>
  );
}

export default Building;
