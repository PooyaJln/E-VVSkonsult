import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import FloorNavBar from "../../layouts/FloorNavBar";
import { useFloorsContext } from "../../hooks/useFloorsContext";
import { useEffect } from "react";

function Floor() {
  const floor_id = useParams().floor_id;

  const { state, apiCalls } = useFloorsContext();
  const floor = state?.item || {};
  useEffect(() => {
    apiCalls.getItem(floor_id);
  }, [floor_id]);
  return (
    <>
      <h2>Floor: {floor?.storey_name}</h2>
      <FloorNavBar />
      <Outlet />
    </>
  );
}

export default Floor;
